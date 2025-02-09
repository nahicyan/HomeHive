import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import AnimatedCards from "../AnimatedCards/AnimatedCards";

const PropertyLeftSection = ({ propertyData, expanded, setExpanded, MAX_LINES = 4 }) => {
  const [imageCards, setImageCards] = useState([]);

  useEffect(() => {
    if (propertyData?.image) {
      try {
        const images = JSON.parse(propertyData.image);
        const cardsData = images.map((image, index) => ({
          image: `${import.meta.env.VITE_SERVER_URL}/${image}`,
          title: `Image ${index + 1}`, // Example title for each image
          description: `This is image ${index + 1} description.`,
        }));
        setImageCards(cardsData);
      } catch (error) {
        console.error("Failed to parse image data:", error);
      }
    }
  }, [propertyData]);

  return (
    <Box sx={{ flex: 4 }}>
      <Box sx={{ marginBottom: "20px", display: "flex", flexWrap: "wrap" }}>
        <Chip
          label={propertyData.ltag}
          sx={{
            backgroundColor: "#FF6F00",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "uppercase",
            padding: "8px 18px",
            borderRadius: "50px",
            marginRight: "12px",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#FF6F00",
              boxShadow: "0 5px 15px rgba(255, 111, 0, 0.3)",
            },
          }}
        />
        <Chip
          label={propertyData.rtag}
          sx={{
            backgroundColor: "#0071E3",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: "50px",
            marginRight: "12px",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#0071E3",
              boxShadow: "0 5px 15px rgba(0, 113, 227, 0.3)",
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#6e6e73",
            backgroundColor: "#f5f5f7",
            padding: "8px 14px",
            borderRadius: "20px",
            marginLeft: "15px",
          }}
        >
          Total Visitors: {propertyData.viewCount} (Admin)
        </Typography>
      </Box>

      {/* Address and Title */}
      <Typography
        sx={{
          fontSize: "13px",
          color: "#8e8e93",
          marginBottom: "10px",
          fontWeight: 300,
        }}
      >
        {propertyData.streetaddress}, {propertyData.city}, {propertyData.state} {propertyData.zip}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "32px",
          fontWeight: 400,
          marginBottom: "25px",
          color: "#1d1d1f",
        }}
      >
        {propertyData.title}
      </Typography>

      {/* Animated Image Gallery */}
      <AnimatedCards cards={imageCards} />

      {/* Description Section */}
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
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : MAX_LINES,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {propertyData.description}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setExpanded(!expanded)}
          sx={{
            margin: "10px 0",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            fontSize: "10px",
            padding: "2px 15px",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          }}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyLeftSection;
