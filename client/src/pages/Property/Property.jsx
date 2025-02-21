import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getProperty } from "../../utils/api";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import PropertyCarousel from "../../components/PropertyCarousel/PropertyCarousel";
import PropertyHeaderLeft from "../../components/PropertyHeaderLeft/PropertyHeaderLeft";
import PropertyHeaderRight from "../../components/PropertyHeaderRight/PropertyHeaderRight";

const Property = () => {
  const { pathname } = useLocation();
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const [propertyData, setPropertyData] = useState(null);

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
    <div className="bg-[#FDF8F2] min-h-screen p-4 text-[#4b5b4d] flex justify-center">
      {/* Outer wrapper ensures content is centered */}
      <div className="max-w-screen-xl w-full">
        {/* Property Header Sections Inline */}
        <div className="flex flex-col lg:flex-row gap-6 w-full bg-[#FDF8F2]">
          {/* Left Section */}
          <div className="w-full lg:w-3/4">
            <PropertyHeaderLeft propertyData={propertyData} />
          </div>
  
          {/* Right Section */}
          <div className="w-full lg:w-1/4">
            <PropertyHeaderRight propertyData={propertyData} />
          </div>
        </div>
  
        {/* Property Carousel */}
        <div className="mt-6">
          <PropertyCarousel propertyData={propertyData} />
        </div>
  
        {/* Property Details */}
        <div className="mt-6 bg-[#FDF8F2]">
          <PropertyDetails propertyData={propertyData} />
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Property;
