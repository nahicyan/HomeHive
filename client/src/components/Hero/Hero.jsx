import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HouseImage from "../../../public/banner.jpg"; //
const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F2EF",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: { xs: "40px", md: "60px 100px" },
      }}
    >
      <Grid container spacing={6} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "36px", md: "64px" },
                fontWeight: 700,
                color: "#2F2F2F",
                lineHeight: 1.2,
                fontFamily: "'Playfair Display', serif", // Custom elegant font
              }}
            >
              Discover the{" "}
              <Box component="span" sx={{ color: "#3C5B30" }}>
              The Best 
              </Box>{" "}
              Land Deals <br /> and In �
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#5F5F5F",
                fontSize: "20px",
                lineHeight: 1.8,
                marginTop: 2,
                fontFamily: "'DM Sans', sans-serif", // Modern sans-serif font for body
              }}
            >
              Explore a curated selection of homes that fit your lifestyle and
              preferences.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px 28px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "50px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              View Listings <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </Button>

            <Box display="flex" gap={2} mt={4} alignItems="center">
              <img
                src="./sample-icon.png"
                alt="Sample"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#2F2F2F",
                  fontSize: "16px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                More than 1000+ properties available
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={HouseImage}
                alt="House"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Price Card */}
              <Card
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#2F2F2F",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Green House
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    color: "#5F5F5F",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  $450,000
                </Typography>
              </Card>

              {/* Discount Badge */}
              <Card
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  padding: "8px 12px",
                  backgroundColor: "#3C5B30",
                  color: "#fff",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Get discount up to 50%
              </Card>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;