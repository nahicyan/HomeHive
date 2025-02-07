import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import FactCard from "../../components/FactCard/FactCard";
import DetailCard from "../../components/DetailCard/DetailCard";
import FloatingButtons from "../../components/FloatingButtons/FloatingButtons";
import {
  getProperty,
  updateProperty,
  getPropertyOffers,
} from "../../utils/api"; // Import updateProperty
import { PuffLoader } from "react-spinners";
import { AiFillStar } from "react-icons/ai";
import "./Property.css";
import { TbMapCheck } from "react-icons/tb";
import { FaRoad } from "react-icons/fa";
import { FaTrailer } from "react-icons/fa";
import { RiFloodLine } from "react-icons/ri";
import { MdOutlineHouseSiding } from "react-icons/md";
import { TbSmartHomeOff } from "react-icons/tb";
import { PiResizeLight } from "react-icons/pi";
import { MdLocationOn } from "react-icons/md";
import { formatPrice } from "../../utils/format";
import { GrMapLocation } from "react-icons/gr";
import Map from "../../components/Map/Map";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { UserContext } from "../../utils/UserContext";
import { transformResidencyData } from "../../utils/residencyValidation";
import { FaPhoneAlt, FaEnvelope, FaHandshake } from "react-icons/fa";

// 1) Retrieve server URL from environment variable, fallback to local
const serverURL = import.meta.env.VITE_SERVER_URL;

const Property = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef(null); // Ref to main container for sticky footer logic
  const [isSticky, setIsSticky] = useState(true); // S
  const MAX_LINES = 4;

  // Extract property ID from the URL
  const id = pathname.split("/").slice(-1)[0];

  // 1) Access the user from context
  const { currentUser } = useContext(UserContext);

  // 2) Fetch the property data with React Query
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  // 3) Local state for edit mode and property data
  const [propertyData, setPropertyData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // State to store offers for this property
  const [offers, setOffers] = useState([]);

  // Loading state for offers (used to show a loading message)
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // Once property data is fetched, copy it into local state
  useEffect(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  // 4) Check if currentUser is admin
  const isAdmin = currentUser?.role === "ADMIN";

  // Fetch offers when admin is logged in and property data is available
  useEffect(() => {
    if (isAdmin && propertyData) {
      fetchOffers();
    }
  }, [isAdmin, propertyData]);

  // Function to fetch offers from the backend
  const fetchOffers = async () => {
    try {
      setLoadingOffers(true); // Show loading state
      const offersData = await getPropertyOffers(propertyData.id); // Call API
      setOffers(offersData.offers); // Store offers in state
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoadingOffers(false); // Remove loading state
    }
  };

  // 5) Save changes to the server
  const handleSave = async () => {
    try {
      // 1) Merge property fields + user object
      const rawUpdateData = {
        ...propertyData,
        currentUser,
      };

      // 2) Validate & convert
      const finalUpdateData = transformResidencyData(rawUpdateData);

      // 3) Send to API
      const updated = await updateProperty(propertyData.id, finalUpdateData);

      // 4) Update local state
      setPropertyData(updated);
      setEditMode(false);
      console.log("Property updated successfully!");
    } catch (err) {
      console.error("Error updating property:", err);
      alert(`Validation Error: ${err.message}`); // or toast.error
    }
  };

  // Sticky Footer Logic
  useEffect(() => {
    const handleScroll = () => {
      const contentBottom = contentRef.current.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      // Disable sticky when content bottom is visible
      setIsSticky(contentBottom > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle loading & error states
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While Fetching The Land Details</span>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>No property data available</span>
        </div>
      </div>
    );
  }

  // Debug logs
  if (currentUser) {
    console.log("Current User: ", currentUser);
  } else {
    console.log("No User Logged In");
  }

  // Local event handler for input changes
  const handleChange = (field, value) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="root-container" ref={contentRef}>
      {/* Left Section */}
      <div className="property-container">
        <div className="property-left">
          <div className="tags-container">
            <span className="tag hot-tag">{propertyData.ltag}</span>
            <span className="tag featured-tag">{propertyData.rtag}</span>
            <span className="total-visitors">
              Total Visitors: {propertyData.viewCount} (Admin)
            </span>
          </div>
          {/* Address and Title */}
          <p className="property-address">
            {propertyData.streetaddress}, {propertyData.city},{" "}
            {propertyData.state} {propertyData.zip}
          </p>
          <h1 className="property-title">{propertyData.title}</h1>
          {/* Main Image */}
          <div className="property-main-image">
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt={propertyData.title}
            />
          </div>
          {/* Description */}
          <Box mt={3}>
            <Typography variant="h6" fontWeight="bold">
              Description
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "15px",
                lineHeight: 1.8,
                fontWeight: 300,
                textAlign: "justify",
                letterSpacing: "0.3px",
                display: "-webkit-box",
                WebkitLineClamp: expanded ? "unset" : MAX_LINES,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {propertyData.description}
            </Typography>

            {/* Show More / Show Less Button */}
            <Button
              variant="contained"
              onClick={() => setExpanded(!expanded)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // 10% transparency
                color: "#fff",
                fontWeight: "bold",
                fontSize: "10px",
                borderRadius: "50px",
                padding: "2px 15px",
                margin: "10px 0px",
                cursor: "pointer",
                transition: "background-color 0.3s ease, opacity 0.3s ease",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.4)", // 60% transparency on hover
                },
              }}
            >
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </Box>
        </div>

        {/* Right Section */}
        <div className="property-right">
          {/* Status and Price */}
          <div className="property-status">
            <span className="status-dot"></span> {propertyData.status}
          </div>
          <h2 className="property-price">
            ${propertyData.askingPrice.toLocaleString()}
          </h2>
          <h2 className="property-acres">{propertyData.acre} Acres</h2>

          {/* Action Buttons */}
          <div className="property-actions">
            <button className="btn-share">Share</button>
          </div>

          {/* Image Gallery (Scrollable) */}
          <div className="property-gallery-scroll">
            {/* Example images; replace or map through image array if available */}
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt="Gallery Image 1"
            />
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt="Gallery Image 2"
            />
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt="Gallery Image 3"
            />
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt="Gallery Image 4"
            />
            <img
              src={`${serverURL}/${propertyData.image}`}
              alt="Gallery Image 5"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="property-details-section">
          {/* Quick Facts */}
          <Box
            mt={4}
            p={3}
            sx={{
              borderRadius: "12px",
              boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.1)", // Floating effect
              background: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Highlights
            </Typography>

            <Grid2 container spacing={2}>
              <Grid2 item xs={6} sm={3}>
                <FactCard title="Sq Feet" value={propertyData.sqft.toLocaleString()} />
              </Grid2>
              <Grid2 item xs={6} sm={3}>
                <FactCard title="Zoning" value={propertyData.zoning} />
              </Grid2>
              <Grid2 item xs={6} sm={3}>
                <FactCard title="Area" value={propertyData.area.toLocaleString()} />
              </Grid2>
              <Grid2 item xs={6} sm={3}>
                <FactCard title="Financing" value={propertyData.financing ? "Available" : "Not Available"} />
              </Grid2>
            </Grid2>
          </Box>

          {/* Directions */}
          <Box
            mt={4}
            p={3}
            sx={{
              borderRadius: "12px",
              boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.1)", // Floating effect
              background: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Property Details
            </Typography>

            <Grid2 container spacing={3} columns={2}>
              <Grid2 xs={1}>
                <DetailCard
                  title="Directions"
                  items={[
                    `Located at ${propertyData.streetaddress}, ${propertyData.city}, ${propertyData.state}`,
                    <a
                      href={propertyData.landIdLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0071e3", textDecoration: "none" }}
                    >
                      {propertyData.landIdLink}
                    </a>,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Location"
                  items={[
                    `Address: ${propertyData.streetaddress}, ${propertyData.city}, ${propertyData.state} ${propertyData.zip}`,
                    `County: ${propertyData.county}`,
                    `Area: ${propertyData.area}`,
                    `Parcels: ${propertyData.apnOrPin}`,
                    `Coordinates: ${propertyData.latitude}, ${propertyData.longitude}`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Property Details"
                  items={[
                    `Size: ${propertyData.sqft.toLocaleString()} Sq Feet`,
                    `Acreage: ${propertyData.acre.toLocaleString()}`,
                    `Type: ${propertyData.type}`,
                    `Sub Type: ${propertyData.subtype}`,
                    `Owner-ID: ${propertyData.ownerid} (Admin)`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Financial Information"
                  items={[
                    `Asking Price: $${propertyData.askingPrice.toLocaleString()}`,
                    `Minimum Price: $${propertyData.minPrice.toLocaleString()} (Admin)`,
                    `Discount Price: $${propertyData.disPrice.toLocaleString()} (Admin)`,
                    `Financing Available: ${propertyData.financing ? "Yes" : "No"}`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Additional Information"
                  items={[
                    `Mobile Home Friendly: ${
                      propertyData.mobileHomeFriendly === "true" ? "Yes" : "No"
                    }`,
                    `Area: ${propertyData.area}`,
                    `Notes: ${propertyData.notes}`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Utilities & Infrastructure"
                  items={[
                    `Water: ${propertyData.water}`,
                    `Sewer: ${propertyData.sewer}`,
                    `Electricity: ${propertyData.electric}`,
                    `Road Condition: ${propertyData.roadCondition}`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="HOA & Zoning"
                  items={[
                    `Zoning: ${propertyData.zoning}`,
                    `Restrictions: ${propertyData.restrictions}`,
                    `HOA/POA: ${propertyData.hoaPoa}`,
                    `HOA Info: ${propertyData.hoaDeedDevInfo}`,
                  ]}
                />
              </Grid2>

              <Grid2 xs={1}>
                <DetailCard
                  title="Environmental Risk"
                  items={[`Floodplain: ${propertyData.floodplain}`]}
                />
              </Grid2>
            </Grid2>
          </Box>
          <div className="disclaimer-section">
            <p>
              Dear Visitor, Thank you for taking the time to review this information.
              This is a broker price opinion or comparative market analysis and
              should not be considered an appraisal or opinion of value. In
              making any decision that relies upon our work, you should know
              that we have not followed the guidelines for the development of an
              appraisal or analysis contained in the Uniform Standards of
              Professional Appraisal Practice of the Appraisal Foundation.
              Always perform your due diligence to verify any numbers presented
              before signing a contract to purchase. Landers Investment LLC has
              an equitable interest in this property and does not claim to be
              the owner. All properties are subject to errors, omissions, deletions,
              additions, and cancellations. All properties are sold as is, where
              is, with absolutely no representations written or oral. Buyer is
              to do their own independent due diligence.The property will not be 
              considered under contract until the signed contract and earnest money 
              are received with all contingencies removed. Thank You! — The Landers Investment LLC Team
            </p>
            <p>
              
            </p>
            <p>
              
            </p>
          </div>
        </div>
        
        <FloatingButtons propertyData={propertyData} />
      </div>
      {/* Sticky Footer Actions */}
    </div>
  );
};

export default Property;
