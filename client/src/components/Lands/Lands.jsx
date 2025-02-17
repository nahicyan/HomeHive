import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
} from "@mui/material";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../components/hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Star, Home, LocationOn } from "@mui/icons-material";

export const Lands = () => {
  const { data, isError, isLoading } = useProperties();
  const navigate = useNavigate();

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography variant="h6" color="error">
          Error While Fetching Data
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <PuffLoader size={80} color="#4066FF" />
      </Box>
    );
  }

  return (
    <section style={{ padding: "50px 0" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: "300px",
          background: "url('/images/hero-background.jpg') center/cover no-repeat",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Discover Your Next Property
        </Typography>
        <Typography variant="h6">Explore the best lands and properties available</Typography>
      </Box>

      {/* Highlighted Features */}
      <Box mt={8} mb={8} className="paddings innerWidth">
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<Home sx={{ fontSize: 40, color: "#FF5722" }} />}
              title="Premium Listings"
              description="Handpicked premium lands and properties for the best value."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<LocationOn sx={{ fontSize: 40, color: "#4CAF50" }} />}
              title="Prime Locations"
              description="Find properties in the most desirable locations."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<Star sx={{ fontSize: 40, color: "#2196F3" }} />}
              title="Trusted Service"
              description="Work with experienced agents who prioritize your needs."
            />
          </Grid>
        </Grid>
      </Box>

      {/* New Properties Section */}
      <Box className="paddings innerWidth l-container" mb={8}>
        <Typography variant="h4" align="center" fontWeight={700} mb={4}>
          New Properties
        </Typography>
        <Swiper {...sliderSettings}>
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
          <SliderButtons />
        </Swiper>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/properties")}
          >
            See All Properties
          </Button>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box className="paddings innerWidth" mt={8} mb={8}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TestimonialCard
                  avatarSrc={`/images/avatar${index + 1}.jpg`}
                  name={`Client ${index + 1}`}
                  feedback="Excellent service and great properties! Highly recommend."
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Footer CTA */}
      <Box
        sx={{
          padding: "50px 0",
          background: "linear-gradient(135deg, #000 0%, #FF8A65 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Ready to Find Your Dream Property?
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            fontSize: "18px",
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            color: "#000",
            "&:hover": {
              backgroundColor: "#FFCCBC",
            },
          }}
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </Box>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card
    sx={{
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <Box mb={2}>{icon}</Box>
    <Typography variant="h6" fontWeight="bold">
      {title}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {description}
    </Typography>
  </Card>
);

const TestimonialCard = ({ avatarSrc, name, feedback }) => (
  <Card
    sx={{
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Avatar src={avatarSrc} sx={{ width: 50, height: 50 }} />
      <Typography variant="subtitle1" fontWeight="bold">
        {name}
      </Typography>
    </Box>
    <Typography variant="body2" color="textSecondary">
      {feedback}
    </Typography>
  </Card>
);

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <Box display="flex" justifyContent="center" gap="20px" mt={4}>
      <Button variant="contained" onClick={() => swiper.slidePrev()}>
        &lt;
      </Button>
      <Button variant="contained" onClick={() => swiper.slideNext()}>
        &gt;
      </Button>
    </Box>
  );
};

export default Lands;
