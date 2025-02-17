import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/format";

const serverURL = import.meta.env.VITE_SERVER_URL;

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  const images = card.image ? JSON.parse(card.image) : [];
  const firstImage = images.length > 0 ? `${serverURL}/${images[0]}` : "/default-image.jpg";

  return (
    <Card
      sx={{
        borderRadius: "18px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        width: "100%",
        maxWidth: "460px",
        height: "380px",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      {/* Header */}

<Box sx={{ p: "6px 14px", backgroundColor: "#000", color: "#fff" }}>
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: "bold",
      fontSize: "15px",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    dangerouslySetInnerHTML={{ __html: card.title }}
  />
</Box>



      {/* Image */}
      <CardMedia
        component="img"
        image={firstImage}
        alt="Property Image"
        sx={{ height: "55%", objectFit: "cover", filter: "brightness(0.85)" }}
      />

      {/* Info Section */}
      <CardContent sx={{ p: "12px", pb: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: "6px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            ${formatPrice(card.askingPrice)}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "13px", color: "#404040", fontWeight: 500 }}>
            {card.acre} Acres
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: "6px" }}>
          <Typography variant="body2" sx={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>
            <strong>{card.city}</strong>, {card.state} {card.zip}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "13px", color: "#666" }}>
            {card.county} County
          </Typography>
        </Box>

        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: "6px" }}>
          {card.ltag && (
            <Chip
              label={card.ltag}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 14px",  // Increased padding for a bigger tag
                borderRadius: "14px",
                boxShadow: "0 3px 8px rgba(88, 88, 88, 0.3)",
              }}
            />
          )}
          {card.rtag && (
            <Chip
              label={card.rtag}
              sx={{
                backgroundColor: "#727272",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 14px",  // Increased padding for a bigger tag
                borderRadius: "14px",
                boxShadow: "0 3px 8px rgba(95, 95, 95, 0.3)",
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
