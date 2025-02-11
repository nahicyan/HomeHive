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
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#00c853",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
          ></span>
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

<Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
 {/* Call Button */}
 <Button
    variant="contained"
    sx={{
      padding: "8px 18px",  // Reduced button height by adjusting padding
      background: "linear-gradient(135deg, #ff8c42, #ff6f00)", // Orange gradient
      color: "#fff",
      fontSize: "16px",  // Increased font size
      fontWeight: "bold",  // Bold text
      borderRadius: "12px",
      transition: "all 0.3s ease",
      textTransform: "none",  // Remove uppercase text
      width: "150px",  // Fixed width to make all buttons the same size
      display: "flex",  // Align icon and text horizontally
      justifyContent: "center",  // Center the content
      gap: "8px",  // Add space between the icon and text
      "&:hover": {
        background: "linear-gradient(135deg, #ff6f00, #e65100)",
        boxShadow: "0 6px 16px rgba(255, 140, 66, 0.4)",
      },
      "&:active": {
        background: "#e65100",
        transform: "scale(0.97)",
      },
      paddingBottom: "10px",  // Added padding to the bottom of the button
    }}
  >
    <Phone sx={{ fontSize: 20 }} />
    Call
  </Button>

  {/* Message Button */}
  <Button
    variant="contained"
    sx={{
      padding: "8px 18px",  // Reduced button height by adjusting padding
      background: "linear-gradient(135deg, #ff8c42, #ff6f00)", // Orange gradient
      color: "#fff",
      fontSize: "16px",  // Increased font size
      fontWeight: "bold",  // Bold text
      borderRadius: "12px",
      transition: "all 0.3s ease",
      textTransform: "none",  // Remove uppercase text
      width: "150px",  // Fixed width to make all buttons the same size
      display: "flex",  // Align icon and text horizontally
      justifyContent: "center",  // Center the content
      gap: "8px",  // Add space between the icon and text
      "&:hover": {
        background: "linear-gradient(135deg, #ff6f00, #e65100)",
        boxShadow: "0 6px 16px rgba(255, 140, 66, 0.4)",
      },
      "&:active": {
        background: "#e65100",
        transform: "scale(0.97)",
      },
      paddingBottom: "10px",  // Added padding to the bottom of the button
    }}
  >
    <Mail sx={{ fontSize: 20 }} />
    Message
  </Button>

  {/* Share Button */}
  <Button
    variant="contained"
    sx={{
      padding: "8px 18px",  // Reduced button height by adjusting padding
      background: "linear-gradient(135deg, #ff8c42, #ff6f00)",
      color: "#fff",
      fontSize: "16px",  // Increased font size
      fontWeight: "bold",  // Bold text
      borderRadius: "12px",
      transition: "all 0.3s ease",
      textTransform: "none",  // Remove uppercase text
      width: "150px",  // Fixed width to make all buttons the same size
      display: "flex",  // Align icon and text horizontally
      justifyContent: "center",  // Center the content
      gap: "8px",  // Add space between the icon and text
      "&:hover": {
        background: "linear-gradient(135deg, #ff6f00, #e65100)",
        boxShadow: "0 6px 16px rgba(255, 140, 66, 0.4)",
      },
      "&:active": {
        background: "#e65100",
        transform: "scale(0.97)",
      },
      paddingBottom: "10px",  // Added padding to the bottom of the button
    }}
  >
    <Share sx={{ fontSize: 20 }} />
    Share
  </Button>
</Box>

      {/* Offer Section */}
<Box mt={3}>
  <Offer propertyData={propertyData} />
</Box>

    </Box>
  );
};

export default PropertyRightSection;
