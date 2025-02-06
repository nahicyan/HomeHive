import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
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
    <div className="property-container" ref={contentRef}>
      {/* Left Section */}
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
        <h3>Description</h3>
        <p className="property-description">{propertyData.description}</p>
        <div className="property-details-section">
          {/* Quick Facts */}
          <h3>Highlights</h3>
          <div className="quick-facts">
            <div className="fact-item">
              <h4>{propertyData.sqft.toLocaleString()}</h4>
              <span>Sq Feet</span>
            </div>

            <div className="fact-item">
              <h4>{propertyData.zoning}</h4>
              <span>Zoning</span>
            </div>

            <div className="fact-item">
              <h4>{propertyData.area.toLocaleString()}</h4>
              <span>Area</span>
            </div>

            <div className="fact-item">
              <h4>{propertyData.financing ? "Available" : "Not Available"}</h4>
              <span>Financing</span>
            </div>
          </div>

          {/* Directions */}
          <div className="property-category">
            <h3>Directions</h3>
            <p>
              Located at {propertyData.streetaddress}, {propertyData.city},{" "}
              {propertyData.state}. Use{" "}
              <a
                href={propertyData.landIdLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {propertyData.landIdLink}
              </a>{" "}
              for more details.
            </p>
          </div>

          {/* Location */}
          <div className="property-section">
            <h3>Location</h3>
            <ul>
              <li>
                Address: {propertyData.streetaddress}, {propertyData.city},{" "}
                {propertyData.state} {propertyData.zip}
              </li>
              <li>County: {propertyData.county}</li>
              <li>Area: {propertyData.area}</li>
              <li>Parcels: {propertyData.apnOrPin}</li>
              <li>
                Coordinates: {propertyData.latitude}, {propertyData.longitude}
              </li>
            </ul>
          </div>

          {/* Property Details */}
          <div className="property-section">
            <h3>Property Details</h3>
            <ul>
              <li>Size: {propertyData.sqft.toLocaleString()} Square Feet</li>
              <li>Acreage: {propertyData.acre.toLocaleString()}</li>
              <li>Type: {propertyData.type}</li>
              <li>Sub Type: {propertyData.subtype}</li>
              <li>Owner-ID: {propertyData.ownerid} (Admin)</li>
            </ul>
          </div>
          {/* Financial Information */}
          <div className="property-section">
            <h3>Financial Information</h3>
            <ul>
              <li>
                Asking Price: ${propertyData.askingPrice.toLocaleString()}
              </li>
              <li>
                Minimum Price: ${propertyData.minPrice.toLocaleString()} (Admin)
              </li>
              <li>
                Discount Price: ${propertyData.disPrice.toLocaleString()}{" "}
                (Admin)
              </li>
              <li>
                Financing Available: {propertyData.financing ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          {/* Additional Information */}
          <div className="property-section">
            <h3>Additional Information</h3>
            <ul>
              <li>
                Mobile Home Friendly:{" "}
                {propertyData.mobileHomeFriendly === "true" ? "Yes" : "No"}
              </li>
              <li>Area: {propertyData.area}</li>
              <li></li>
              <li>Notes: {propertyData.notes}</li>
            </ul>
          </div>
          {/* Utilities & Infrastructure */}
          <div className="property-section">
            <h3>Utilities & Infrastructure</h3>
            <ul>
              <li>Water: {propertyData.water}</li>
              <li>Sewer: {propertyData.sewer}</li>
              <li>Electricity: {propertyData.electric}</li>
              <li>Road Condition: {propertyData.roadCondition}</li>
            </ul>
          </div>

          {/* HOA & Zoning */}
          <div className="property-section">
            <h3>HOA & Zoning</h3>
            <ul>
              <li>Zoning: {propertyData.zoning}</li>
              <li>Restrictions: {propertyData.restrictions}</li>
              <li>HOA/POA: {propertyData.hoaPoa}</li>
              <li>HOA Info: {propertyData.hoaDeedDevInfo}</li>
            </ul>
          </div>
          {/* Enviromental Risk*/}
          <div className="property-section">
            <h3>Environmental Risk</h3>
            <ul>
              <li>Floodplain: {propertyData.floodplain}</li>
            </ul>
          </div>
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
        {/* Sticky Footer Section */}
        <div className={`sticky-footer ${isSticky ? "sticky" : "static"}`}>
          <button className="call-btn">
            <FaPhoneAlt style={{ marginRight: "8px" }} />
            Call
          </button>
          <button
            className="offer-btn"
            onClick={() =>
              navigate(`/properties/${propertyData?.id}/offer`, {
                state: { property: propertyData },
              })
            }
          >
            <FaHandshake style={{ marginRight: "8px" }} />
            Make Offer
          </button>
          <button className="message-btn">
            <FaEnvelope style={{ marginRight: "8px" }} />
            Message
          </button>
        </div>
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
      {/* Sticky Footer Actions */}
    </div>
  );
};

export default Property;
