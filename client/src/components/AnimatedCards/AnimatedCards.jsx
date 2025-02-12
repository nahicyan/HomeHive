import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const AnimatedCards = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        scrollbarWidth: "thin",
        padding: "50px 50px",
        maxWidth: "80%",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c0c0c5",
          borderRadius: "4px",
        },
      }}
    > 
      {cards.map((card, index) => (
        <Box
          key={index}
          onClick={() => setActiveIndex(index)}
          sx={{
            width: activeIndex === index ? "600px" : "80px",
            height: "400px",
            borderRadius: "16px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            overflow: "hidden",
            margin: "0 10px",
            display: "flex",
            alignItems: "flex-end",
            transition: "width 0.6s cubic-bezier(0.28, -0.03, 0, 0.99)",
            boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
            backgroundImage: `url(${card.image})`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "16px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              width: "100%",
              opacity: activeIndex === index ? 1 : 0,
              transform: activeIndex === index ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              {card.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#b0b0ba", paddingTop: "5px" }}>
              {card.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AnimatedCards;
