import React, { useState } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AnimatedCards = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (index) => {
    if (activeIndex === index && !isModalOpen) {
      setIsModalOpen(true); // Open modal if the card is already active
    } else {
      setActiveIndex(index); // Otherwise, set the clicked card as active
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          padding: "20px 0",
          maxWidth: "100%",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c0c0c5",
            borderRadius: "4px",
          },
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            onClick={() => handleCardClick(index)}
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
              <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0ba", paddingTop: "5px" }}>
                {card.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Modal Overlay */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
          }}
        >
          {cards[activeIndex]?.image ? (
            <Box
              sx={{
                position: "relative",
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="img"
                src={cards[activeIndex].image}
                alt={`Image ${activeIndex + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ) : (
            <Typography variant="h6" color="white">
              Image not available.
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AnimatedCards;
