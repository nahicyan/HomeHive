import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const DetailCard = ({ title, items, icon }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Header with Raised Effect */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Ensures vertical alignment of icon and title
          gap: 1,
          mb: 2,
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
          p: 1.5,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ color: "#1976d2"}}>
          {icon}
        </Box>
        <Typography 
          variant="h6" 
          sx={{
            fontSize: "20px",
            color: "#000",
            textTransform: "none",
            lineHeight: "1.2", // Reduces extra space for tighter alignment
          }}
        >
          {title}
        </Typography>
      </Box>
        {items.map((item, index) => (
          <Typography
            component="li"
            key={index}
            sx={{
              fontSize: "18px", 
              color: "#404040",
              lineHeight: 1.6,
              mb: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
    </Box>
  );
};

export default DetailCard;
