import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import PropertyLeftSection from "../../components/PropertyLeftSection/PropertyLeftSection";
import PropertyRightSection from "../../components/PropertyRightSection/PropertyRightSection";
import PropertyDetailsSection from "../../components/PropertyDetailsSection/PropertyDetailsSection";
import FloatingButtons from "../../components/FloatingButtons/FloatingButtons";
import { getProperty } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";

const Property = () => {
  const { pathname } = useLocation();
  const contentRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);
  const [propertyData, setPropertyData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useContext(UserContext);

  // Extract property ID from the URL
  const propertyId = pathname.split("/").slice(-1)[0];

  // Fetch property data using React Query
  const { data, isLoading, isError } = useQuery(
    ["resd", propertyId],
    () => getProperty(propertyId),
    { retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  // Sticky Footer Logic
  useEffect(() => {
    const handleScroll = () => {
      const contentBottom = contentRef.current.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      setIsSticky(contentBottom > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error while fetching the property details. Please try again.
        </Typography>
      </Box>
    );
  }

  if (!propertyData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No property data available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1900px",
        margin: "50px auto",
        padding: "35px",
        background: "#ffffff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      }}
      ref={contentRef}
    >
      <Box display="flex" gap={4} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        {/* Left Section */}
        <PropertyLeftSection
          propertyData={propertyData}
          expanded={expanded}
          setExpanded={setExpanded}
        />

        {/* Right Section */}
        <PropertyRightSection propertyData={propertyData} />
      </Box>

      <Box mt={4}>
        <PropertyDetailsSection propertyData={propertyData} />
      </Box>

      <FloatingButtons propertyData={propertyData} isSticky={isSticky} />
    </Box>
  );
};

export default Property;
