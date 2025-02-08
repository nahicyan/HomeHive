import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";

const PropertyLeftSection = ({
  propertyData,
  firstImageUrl,
  serverURL,
  expanded,
  setExpanded,
  MAX_LINES,
}) => {
  return (
    <Box sx={{
      flex: 2,
    }}>
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
            letterSpacing: "1.2px",
            marginRight: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#FF6F00",
              transform: "translateY(-3px)",
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
            textTransform: "uppercase",
            padding: "8px 18px",
            borderRadius: "50px",
            letterSpacing: "1.2px",
            marginRight: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#0071E3",
              transform: "translateY(-3px)",
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
            fontWeight: 500,
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
            marginLeft: "15px",
            display: "inline-block",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#0071E3",
              color: "#ffffff",
              transform: "translateY(-3px)",
              boxShadow: "0 5px 15px rgba(0, 113, 227, 0.2)",
            },
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
          letterSpacing: "0.8px",
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
          lineHeight: 1.3,
        }}
      >
        {propertyData.title}
      </Typography>

      {/* Main Image */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          marginBottom: "25px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          component="img"
          src={firstImageUrl ? `${serverURL}/${firstImageUrl}` : "/default-image.jpg"}
          alt={propertyData.title}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "14px",
            objectFit: "cover",
          }}
        />
      </Box>

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
    </Box>
  );
};

export default PropertyLeftSection;
