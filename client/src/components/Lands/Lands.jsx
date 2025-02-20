import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import useProperties from "../../components/hooks/useProperties";

// Simple variants for fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

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
    <>
      {/* First Section: Find The Best Land In Your Area */}
      <motion.section
        className="py-12 bg-[#FDF8F2]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Section Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#4b5b4d]">
              Find The Best Land In Your Area
            </h2>
            <p className="text-sm md:text-base text-[#4b5b4d]/80">
              Browse By Area
            </p>
          </div>

          {/* 5 Categories Grid (DFW, Austin, Houston, San Antonio, Others) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {/* DFW */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-light mb-2 text-[#4b5b4d]">Dallas Fort Worth</h3>
              <div className="relative group w-full aspect-w-16 aspect-h-10 
                              rounded-lg shadow-md overflow-hidden 
                              transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="./dfw.jpg"
                  alt="DFW"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <button  onClick={() => navigate("/DFW")}  className="bg-white text-[#4b5b4d] font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg">
                    Lands in DFW
                  </button>
                </div>
              </div>
            </div>

            {/* Austin */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-light mb-2 text-[#4b5b4d]">Austin</h3>
              <div className="relative group w-full aspect-w-16 aspect-h-10 
                              rounded-lg shadow-md overflow-hidden 
                              transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="./austin.jpg"
                  alt="Austin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigate("/Austin")} className="bg-white text-[#4b5b4d] font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg">
                    Lands in Austin
                  </button>
                </div>
              </div>
            </div>

            {/* Houston */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-light mb-2 text-[#4b5b4d]">Houston</h3>
              <div className="relative group w-full aspect-w-16 aspect-h-10 
                              rounded-lg shadow-md overflow-hidden 
                              transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="./houston.jpg"
                  alt="Houston"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigate("/Houston")} className="bg-white text-[#4b5b4d] font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg">
                    Lands in Houston
                  </button>
                </div>
              </div>
            </div>

            {/* San Antonio */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-light mb-2 text-[#4b5b4d]">San Antonio</h3>
              <div className="relative group w-full aspect-w-16 aspect-h-10 
                              rounded-lg shadow-md overflow-hidden 
                              transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="./sanantonio.jpg"
                  alt="San Antonio"
                  className="w-full h-full object-cover"
                />
                <div onClick={() => navigate("/SanAntonio")} className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-[#4b5b4d] font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg">
                    Lands in San Antonio
                  </button>
                </div>
              </div>
            </div>

            {/* Others */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-light mb-2 text-[#4b5b4d]">Others</h3>
              <div className="relative group w-full aspect-w-16 aspect-h-10 
                              rounded-lg shadow-md overflow-hidden 
                              transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <img
                  src="./others.jpg"
                  alt="Others"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigate("/OtherLands")} className="bg-white text-[#4b5b4d] font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg">
                    Other Lands
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Second Section: Featured Properties */}
      <motion.section
        className="py-12 bg-[#FDF8F2]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Title & Subtext */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 text-[#4b5b4d]">
              Featured Properties
            </h2>
            {/* Decorative line under the heading */}
            <div className="mx-auto w-20 h-1 bg-[#576756] mb-2"></div>
            <p className="text-[#4b5b4d]/80">
              Discover our top picks for this week
            </p>
          </div>

          {/* Property Cards Grid - Larger & Wider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((property) => (
              <PropertyCard key={property.id} card={property} />
            ))}
          </div>

          {/* Browse All Properties Button */}
          <div className="mt-8 flex justify-end">
            <a
              href="/properties"
              className="inline-block bg-[#576756] text-white font-semibold py-2 px-6 rounded-md shadow 
                         hover:bg-[#4b5b4d] transition-colors"
            >
              Browse All Properties
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Lands;
