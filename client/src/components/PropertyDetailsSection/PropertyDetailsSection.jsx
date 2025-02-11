import React from "react";
import {Box, Typography, Grid, Card, CardContent, Chip, Button} from "@mui/material";
import {LocationOn, Home, AttachMoney, Layers, LocalOffer, WaterDrop } from "@mui/icons-material";
import DetailCard from "../DetailCard/DetailCard";
import { Landscape } from "@mui/icons-material";
import Map from "../Map/Map"; // Import the Map component
import { Map as MapIcon } from "@mui/icons-material"; // Import the Map icon
import { Description } from "@mui/icons-material"; // MUI Icon

const PropertyDetailsSection = ({ propertyData, expanded, setExpanded, MAX_LINES = 4 }) => {
  return (
    <Box mt={4}>
      {/* Description Section */}
      <Card
        sx={{
          borderRadius: "20px",
          p: 3,
          mb: 4,
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardContent>
          <Box mt={3}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontSize: "26px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#FF6F00",
              }}
            >
              <Description sx={{ fontSize: "24px", color: "#FF6F00" }} />
              Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "16px",
                lineHeight: 1.8,
                fontWeight: 400,
                color: "#404040",
                "& ul": {
                  paddingLeft: "20px",
                  listStyleType: "disc",
                },
                "& ol": {
                  paddingLeft: "20px",
                  listStyleType: "decimal",
                },
                "& li": {
                  marginBottom: "8px",
                },
                "& p": {
                  marginBottom: "12px",
                },
                "& b, & strong": {
                  fontWeight: "bold",
                  color: "#333",
                },
                "& i, & em": {
                  fontStyle: "italic",
                },
                "& u": {
                  textDecoration: "underline",
                },
                "& a": {
                  color: "#FF6F00",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#D35400",
                  },
                },
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: propertyData.description }}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: expanded ? "unset" : MAX_LINES,
                  WebkitBoxOrient: "vertical",
                  overflow: expanded ? "visible" : "hidden",
                }}
              />
            </Typography>

            <Button
              variant="contained"
              onClick={() => setExpanded(!expanded)}
              sx={{
                margin: "10px 0",
                backgroundColor: "#FF6F00",
                color: "#fff",
                fontSize: "12px",
                padding: "6px 18px",
                fontWeight: 500,
                borderRadius: "8px",
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: "#D35400" },
              }}
            >
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </Box>
        </CardContent>
      </Card>
  
      {/* Property Details Section */}
      <Card
        sx={{
          borderRadius: "20px",
          p: 3,
          mb: 4,
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: "26px",
              display: "flex",
              alignItems: "center",
              gap: "8px", // Space between icon and text
              color: "#FF6F00",
            }}
          >
            <Landscape sx={{ fontSize: "28px", color: "#FF6F00" }} />
            Property Details
          </Typography>

          <Box sx={{ mt: 2 }}>{/* Remaining content here */}</Box>

          {/* Two-column Grid */}
          <Grid container spacing={3}>
            {/* Location Section */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="Location"
                items={[
                  `Address: ${propertyData.streetaddress}, ${propertyData.city}, ${propertyData.state} ${propertyData.zip}`,
                  `County: ${propertyData.county}`,
                  `Area: ${propertyData.area}`,
                  `Coordinates: ${propertyData.latitude}, ${propertyData.longitude}`,
                ]}
                icon={
                  <LocationOn sx={{ fontSize: "24px", color: "#FF6F00" }} />
                }
              />
            </Grid>

            {/* Utilities Section */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="Utilities & Infrastructure"
                items={[
                  `Water: ${propertyData.water}`,
                  `Sewer: ${propertyData.sewer}`,
                  `Electricity: ${propertyData.electric}`,
                  `Road Condition: ${propertyData.roadCondition}`,
                  `Floodplain: ${propertyData.floodplain}`,
                ]}
                icon={<WaterDrop sx={{ fontSize: "24px", color: "#FF6F00" }} />}
              />
            </Grid>

            {/* Financial Section */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="Financial Information"
                items={[
                  `Asking Price: $${propertyData.askingPrice.toLocaleString()}`,
                  `Minimum Price: $${propertyData.minPrice.toLocaleString()}`,
                  `Discount Price: $${propertyData.disPrice.toLocaleString()}`,
                  `Financing: ${propertyData.financing ? "Yes" : "No"}`,
                ]}
                icon={
                  <AttachMoney sx={{ fontSize: "24px", color: "#FF6F00" }} />
                }
              />
            </Grid>

            {/* HOA & Zoning Section */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="HOA & Zoning"
                items={[
                  `Zoning: ${propertyData.zoning}`,
                  `Restrictions: ${propertyData.restrictions}`,
                  `HOA/POA: ${propertyData.hoaPoa}`,
                  `HOA Info: ${propertyData.hoaDeedDevInfo}`,
                ]}
                icon={<Home sx={{ fontSize: "24px", color: "#FF6F00" }} />}
              />
            </Grid>

            {/* Physical Attributes Section */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="Physical Attributes"
                items={[
                  `Square Feet: ${propertyData.sqft.toLocaleString()}`,
                  `Acreage: ${propertyData.acre}`,
                  `Mobile Home Friendly: ${
                    propertyData.mobileHomeFriendly === "true" ? "Yes" : "No"
                  }`,
                ]}
                icon={<Layers sx={{ fontSize: "24px", color: "#FF6F00" }} />}
              />
            </Grid>

            {/* Tags & Notes */}
            <Grid item xs={12} sm={6}>
              <DetailCard
                title="Additional Information"
                items={[
                  <div
                    key="notes"
                    dangerouslySetInnerHTML={{ __html: propertyData.notes }}
                    style={{ whiteSpace: "pre-wrap" }}
                  />,
                ]}
                icon={
                  <LocalOffer sx={{ fontSize: "24px", color: "#FF6F00" }} />
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Map Section */}
      <Card
        sx={{
          borderRadius: "20px",
          p: 3,
          mb: 4,
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          {" "}
          {/* Remove extra padding from bottom */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: "26px",
              display: "flex",
              alignItems: "center",
              gap: "8px", // Space between icon and text
              color: "#FF6F00",
              marginBottom: "20px", // Ensure proper spacing between title and map
            }}
          >
            <MapIcon sx={{ fontSize: "28px", color: "#FF6F00" }} />{" "}
            {/* Map icon */}
            Map
          </Typography>
          <Map
            address={propertyData.streetaddress}
            city={propertyData.city}
            state={propertyData.state}
            sx={{ width: "100%", height: "300px" }} // Ensure Map takes full width and fix height
          />
        </CardContent>
      </Card>

      {/* Disclaimer Section */}
      <Card
        sx={{
          backgroundColor: "#fff3e0",
          border: "1px solid #ffe0b2",
          borderRadius: "16px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.05)",
          mt: 4,
        }}
      >
        <CardContent>
          <Chip
            label="Disclaimer"
            sx={{
              mb: 2,
              backgroundColor: "#FF6F00",
              color: "#fff",
            }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "justify", // Justify text alignment
              fontSize: "0.8rem", // Smaller font size
              lineHeight: 1.2, // Improve line spacing for better readability
            }}
          >
            Dear Visitor, This is a broker price opinion or comparative market
            analysis and should not be considered an appraisal or opinion of
            value. In making any decision that relies upon our work, you should
            know that we have not followed the guidelines for the development of
            an appraisal or analysis contained in the Uniform Standards of
            Professional Appraisal Practice of the Appraisal Foundation. Always
            perform your due diligence to verify any numbers presented before
            signing a contract to purchase. Landers Investment LLC has an
            equitable interest in this property and does not claim to be the
            owner. Managing Members of Landers Investment LLC holds active real
            estate licenses in the state of Texas. We do NOT represent you as
            your real estate agent in any capacity whatsoever unless agreed upon
            by all parties in writing. Selling through an assignment of
            contract. LANDERS INVESTMENT is selling an option or assigning an
            interest in a contract and does not represent, warrant, or claim to
            be the owner of or currently possess legal title to this, or any of
            the properties we market for sale. All properties are subject to
            errors, omissions, deletions, additions, and cancellations. All
            properties are sold as is, where is, with absolutely no
            representations written or oral. Buyer is to do their own
            independent due diligence. The property will not be considered under
            contract until the signed contract and earnest money are received
            with all contingencies removed. - Thank you. Landers Investment LLC
            Team
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyDetailsSection;
