import React, { useState, useRef } from "react";
import { PuffLoader } from "react-spinners";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useProperties from "../../components/hooks/useProperties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Properties() {
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");

  // Ref object to hold references to each horizontal scroll container
  const scrollRefs = useRef({});

  // Define the locations you want separate sections for
  const areas = ["DFW", "Austin", "Houston", "San Antonio", "Others"];

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle search query (filter data) if desired
  };

  // Scroll Left
  const handleScrollLeft = (area) => {
    const container = scrollRefs.current[area];
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right
  const handleScrollRight = (area) => {
    const container = scrollRefs.current[area];
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-red-600 text-xl font-semibold">
          Error fetching data.
        </h2>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <PuffLoader size={80} color="#404040" />
      </div>
    );
  }

  // Main Layout
  return (
    <div className="bg-[#FDF8F2] min-h-screen py-12 text-[#4b5b4d]">
      {/* Hero Section */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title & Subtitle */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg mb-6">
            Browse through a wide selection of properties with detailed filters
            to help you find the perfect fit.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-full shadow-md p-2 transition hover:shadow-lg">
              <input
                type="text"
                placeholder="Search by location, price, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black hover:bg-[#FF5C00] text-white px-5 py-2 rounded-full mt-2 sm:mt-0 sm:ml-2 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 inline-block" />
              </button>
            </div>
          </form>
        </div>

        {/* Small Separating Line */}
        <hr className="my-8 border-t border-[#4b5b4d]/20" />

        {/* Location Sections */}
        {areas.map((area) => {
          // Filter properties for the current area
          const areaProperties = data.filter(
            (property) => property.area === area
          );
          // Skip section if no properties for that area
          if (areaProperties.length === 0) return null;

          return (
            <div key={area} className="my-12">
              {/* Section Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Properties in {area}
              </h2>

              {/* Horizontal Slider Container */}
              <div className="relative">
                {/* Left Button (placed on the side) */}
                <button
                  onClick={() => handleScrollLeft(area)}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border 
                             rounded-full p-2 shadow-md hover:shadow-lg"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {/* Scrollable Row */}
                <div
                  className="overflow-x-auto overflow-y-hidden no-scrollbar px-2 py-4"
                  ref={(el) => (scrollRefs.current[area] = el)}
                >
                  <div className="flex space-x-6">
                  {areaProperties.map((card) => (
  <div
    key={card.id}
    className="w-72 flex-shrink-0 my-2 md:my-4 transition hover:scale-105"
  >
    <PropertyCard card={card} />
  </div>
))}

                  </div>
                </div>

                {/* Right Button (placed on the side) */}
                <button
                  onClick={() => handleScrollRight(area)}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border 
                             rounded-full p-2 shadow-md hover:shadow-lg"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
