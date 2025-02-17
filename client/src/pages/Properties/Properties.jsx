import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  InputBase,
  Chip,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../components/hooks/useProperties";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle search query (filter data)
  };

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <Typography variant="h5" color="error">
          Error fetching data.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <PuffLoader height={80} width={80} color="#404040" />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F7F8F9", padding: "40px 0" }}>
      {/* Hero Section */}
      <Container maxWidth="xl">
        {" "}
        {/* Changed to maxWidth="xl" for a wider container */}
        <Box sx={{ marginBottom: "40px" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#2E2E2E",
              marginBottom: "16px",
              fontSize: { xs: "28px", sm: "36px" },
            }}
          >
            Find Your Dream Property
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#6D6D6D",
              fontSize: "18px",
              marginBottom: "24px",
            }}
          >
            Browse through a wide selection of properties with detailed filters
            to help you find the perfect fit.
          </Typography>

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px 16px",
            }}
          >
            <InputBase
              placeholder="Search by location, price, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                fontSize: "16px",
                padding: "10px",
                borderRadius: "50px",
                boxShadow: "none",
                "&:focus": { boxShadow: "none" },
              }}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "50px",
                padding: "12px 20px",
                marginLeft: "10px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#FF5C00",
                },
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </Box>
        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <Chip
            label="For Sale"
            color="primary"
            clickable
            sx={{ fontSize: "14px" }}
          />
          <Chip
            label="For Rent"
            color="primary"
            clickable
            sx={{ fontSize: "14px" }}
          />
          <Chip
            label="Commercial"
            color="primary"
            clickable
            sx={{ fontSize: "14px" }}
          />
          <Chip
            label="Residential"
            color="primary"
            clickable
            sx={{ fontSize: "14px" }}
          />
          <Chip
            label="Luxury"
            color="primary"
            clickable
            sx={{ fontSize: "14px" }}
          />
        </Box>
        {/* Property Cards Grid */}
        <Grid container spacing={3}>
          {data.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <PropertyCard card={card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Properties;
