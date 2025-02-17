import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Offer from "../Offer/Offer"; // Adjust path if needed
import { Phone, Mail, Share } from "@mui/icons-material"; // Import MUI icons

const serverURL = import.meta.env.VITE_SERVER_URL;

const PropertyRightSection = ({ propertyData }) => {
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from propertyData.image (assumed to be a JSON array)
  useEffect(() => {
    if (propertyData.image) {
      try {
        const images = JSON.parse(propertyData.image);
        setImageUrls(images);
      } catch (error) {
        console.error("Failed to parse image data:", error);
      }
    }
  }, [propertyData.image]);

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Status and Price */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "13px", color: "#000", fontWeight: 400 }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: propertyData.status === "Available" ? "#00c853" : "#f44336",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
          ></span>
          {propertyData.status}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "26px", fontWeight: 300, color: "#000" }}
        >
          ${propertyData.askingPrice.toLocaleString()}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "18px", color: "#4a4a4a", fontWeight: 300 }}
        >
          {propertyData.acre} Acres
        </Typography>
      </Box>

      {/* Buttons Section */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
        {["Call", "Message", "Share"].map((label, index) => {
          const icons = [<Phone />, <Mail />, <Share />];
          return (
            <Button
              key={label}
              variant="contained"
              sx={{
                padding: "8px 18px",
                background: "#000", // Black button
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                textTransform: "none",
                width: "150px",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                "&:hover": {
                  background: "#333", // Darker black on hover
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
                "&:active": {
                  background: "#000",
                  transform: "scale(0.97)",
                },
              }}
            >
              {icons[index]} {label}
            </Button>
          );
        })}
      </Box>

      {/* Offer Section */}
      <Box mt={3}>
        <Offer propertyData={propertyData} />
      </Box>
    </Box>
  );
};

export default PropertyRightSection;
