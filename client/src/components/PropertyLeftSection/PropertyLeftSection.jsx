import React, { useState, useEffect } from "react";
import PropertyDetailsSection from "../PropertyDetailsSection/PropertyDetailsSection";
import { Box, Typography, Chip } from "@mui/material";
import AnimatedCards from "../AnimatedCards/AnimatedCards";
import "react-quill/dist/quill.snow.css";
import {Card, CardContent } from "@mui/material";
import { Home, Search, Layers, LocalOffer, AttachMoney} from "@mui/icons-material"; // Import the magnifying glass icon
import {Grid} from "@mui/material";
import FactCard from "../FactCard/FactCard";

const PropertyLeftSection = ({propertyData}) => {
  const [imageCards, setImageCards] = useState([]);
  useEffect(() => {
    if (propertyData?.image) {
      try {
        const images = JSON.parse(propertyData.image);
        const cardsData = images.map((image, index) => ({
          image: `${import.meta.env.VITE_SERVER_URL}/${image}`,
          // title: `Image ${index + 1}`, // Example title for each image
          // description: `This is image ${index + 1} description.`,
        }));
        setImageCards(cardsData);
      } catch (error) {
        console.error("Failed to parse image data:", error);
      }
    }
  }, [propertyData]);

  return (
    <Box
  sx={{
    flex: 4,
    overflowY: "auto",
    maxHeight: "80vh",
    paddingRight: "15px", // Prevents content from being cut off
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for Chrome, Safari, Edge
    },
  }}
>
      {/* Sticky Section (Tags, Visitors, Address, Title) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "15px 0",
          zIndex: 1000,
          borderBottom: "1px solidrgb(172, 172, 172)", // Subtle separator
        }}
      >
        {/* Tags & Visitors */}
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            label={propertyData.ltag}
            sx={{
              backgroundColor: "#000",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
                boxShadow: "0 5px 15px rgba(100, 100, 100, 0.15)",
              },
            }}
          />
          <Chip
            label={propertyData.rtag}
            sx={{
              backgroundColor: "#727272",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#717171",
                boxShadow: "0 5px 15px rgba(100, 100, 100, 0.3)",
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              color: "#73737",
              backgroundColor: "#f5f5f7",
              padding: "8px 14px",
              borderRadius: "20px",
            }}
          >
            Total Visitors: {propertyData.viewCount} (Admin)
          </Typography>
        </Box>

        {/* Address & Title */}
        <Typography
          sx={{
            fontSize: "13px",
            color: "#939393",
            fontWeight: 300,
            marginBottom: "5px",
          }}
        >
          {propertyData.streetaddress}, {propertyData.city}, {propertyData.state} {propertyData.zip}
        </Typography>
        <Typography variant="h4" sx={{ fontSize: "30px", fontWeight: 500, color: "#1d1d1f", marginBottom: "15px" }} dangerouslySetInnerHTML={{ __html: propertyData.title }} />
      </Box>

      {/* Animated Image Gallery */}
      <AnimatedCards cards={imageCards} />

      {/* Quick Facts Section */}
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
              color: "#000",
            }}
          >
            <Search sx={{ fontSize: "28px", color: "#000" }} />
            Highlights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <FactCard
                title="Size"
                value={propertyData.sqft.toLocaleString() + " Square Feet"}
                icon={<Layers />}
                backgroundColor="#FF7043"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FactCard
                title="Zoning"
                value={propertyData.zoning}
                icon={<Home />}
                backgroundColor="#42A5F5"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FactCard
                title="Area"
                value={propertyData.area.toLocaleString()}
                icon={<LocalOffer />}
                backgroundColor="#7E57C2"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FactCard
                title="Financing"
                value={propertyData.financing ? "Available" : "Not Available"}
                icon={<AttachMoney />}
                backgroundColor="#66BB6A"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Property Details Section */}
      <Box mt={4}>
        <PropertyDetailsSection propertyData={propertyData} />
      </Box>
    </Box>
  );
};

export default PropertyLeftSection;