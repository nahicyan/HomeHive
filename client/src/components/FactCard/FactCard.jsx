import React from "react";
import { Box, Typography } from "@mui/material";

const FactCard = ({ title, value, icon, backgroundColor }) => {
  return (
    <Box
  sx={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 2,
    background: "#fff", // White background
    border: "1px solid rgba(0, 0, 0, 0.1)", // Light border
    borderRadius: "12px",
    color: "#000", // Black text
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)", // Softer shadow
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    },
  }}
>
  <Box
    sx={{
      fontSize: "28px",
      backgroundColor: "rgba(226, 226, 226, 0.93)", // Light orange background for the icon
      borderRadius: "50%",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000", // Orange icon
    }}
  >
    {icon}
  </Box>
  <Box>
  <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#000", fontWeight: 600, mb: 0.3 }}>
  {title}
</Typography>

    <Typography variant="body2" sx={{ fontSize: "18px", color: "#000", opacity: 0.9 }}>
      {value}
    </Typography>
  </Box>
</Box>

  );
};

export default FactCard;
