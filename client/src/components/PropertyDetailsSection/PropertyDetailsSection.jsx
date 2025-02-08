import React from "react";
import { Box, Typography, Grid2 } from "@mui/material"; // Grid2 for layout
import FactCard from "../FactCard/FactCard";
import DetailCard from "../DetailCard/DetailCard";

const PropertyDetailsSection = ({ propertyData }) => {
  return (
    <Box mt={4}>
      {/* Quick Facts Section */}
      <Box
        mt={4}
        p={3}
        sx={{
          borderRadius: "12px",
          boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.1)",
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

      {/* Property Details Section */}
      <Box
        mt={4}
        p={3}
        sx={{
          borderRadius: "12px",
          boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.1)",
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
                `Mobile Home Friendly: ${propertyData.mobileHomeFriendly === "true" ? "Yes" : "No"}`,
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
            <DetailCard title="Environmental Risk" items={[`Floodplain: ${propertyData.floodplain}`]} />
          </Grid2>
        </Grid2>
      </Box>

      {/* Disclaimer Section */}
      <Box
        mt={4}
        p={3}
        sx={{
          backgroundColor: "#f9f9fb",
          border: "1px solid #e0e0e3",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          position: "relative",
          fontSize: "10px",
          color: "#6e6e73",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "-12px",
            left: "20px",
            backgroundColor: "#fff",
            padding: "0 10px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#ff6f00",
            borderRadius: "6px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Disclaimer
        </Typography>
        <Typography paragraph>
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
        </Typography>
      </Box>
    </Box>
  );
};

export default PropertyDetailsSection;
