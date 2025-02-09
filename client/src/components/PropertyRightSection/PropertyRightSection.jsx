import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

const serverURL = import.meta.env.VITE_SERVER_URL;

const PropertyRightSection = ({ propertyData }) => {
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from propertyData.image (assumed to be a JSON array)
  useEffect(() => {
    if (propertyData.image) {
      try {
        const images = JSON.parse(propertyData.image); // Parse the JSON string to an array
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
          sx={{ fontSize: "13px", color: "#0071e3", fontWeight: 400 }}
        >
          <span style={{ width: "8px", height: "8px", backgroundColor: "#00c853", borderRadius: "50%", display: "inline-block", marginRight: "8px" }}></span>
          {propertyData.status}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "26px", fontWeight: 300, color: "#1d1d1f" }}
        >
          ${propertyData.askingPrice.toLocaleString()}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "18px", color: "#333335", fontWeight: 300 }}
        >
          {propertyData.acre} Acres
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
        <Button
          variant="contained"
          sx={{
            padding: "14px 28px",
            background: "linear-gradient(135deg, #ff8c42, #ff6f00)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 400,
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #ff6f00, #e65100)",
              boxShadow: "0 6px 16px rgba(255, 140, 66, 0.4)",
            },
            "&:active": {
              background: "#e65100",
              transform: "scale(0.97)",
            },
          }}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyRightSection;
