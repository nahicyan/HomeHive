import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import PropertyLeftSection from "../../components/PropertyLeftSection/PropertyLeftSection";
import PropertyRightSection from "../../components/PropertyRightSection/PropertyRightSection";
import FloatingButtons from "../../components/FloatingButtons/FloatingButtons";
import { getProperty } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";

const Property = () => {
  const { pathname } = useLocation();
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const [propertyData, setPropertyData] = useState(null);
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

  // **Fix: Scroll the left section when scrolling on the right**
  useEffect(() => {
    const handleScrollRight = (event) => {
      if (leftSectionRef.current) {
        event.preventDefault(); // Stop the default scroll on right section
        leftSectionRef.current.scrollTop += event.deltaY; // Scroll left section
      }
    };

    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.addEventListener("wheel", handleScrollRight, { passive: false });
    }

    return () => {
      if (rightSection) {
        rightSection.removeEventListener("wheel", handleScrollRight);
      }
    };
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
        display: "flex",
        gap: 4,
      }}
    >
      {/* Left Section (Scrollable) */}
      <Box
        sx={{
          flex: 3,
          overflowY: "auto",
          height: "80vh",
          paddingRight: "20px",
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Edge
          },
        }}
        ref={leftSectionRef}
      >
        <PropertyLeftSection propertyData={propertyData} />
      </Box>

      {/* Right Section (Sticky & Scrolls Left Section) */}
      <Box
        sx={{
          flex: 1,
          position: "sticky",
          top: "20px",
          height: "fit-content",
          overflow: "hidden", // Prevents unwanted scrolling
        }}
        ref={rightSectionRef} // Reference for scrolling control
      >
        <PropertyRightSection propertyData={propertyData} />
      </Box>
    </Box>
  );
};

export default Property;
