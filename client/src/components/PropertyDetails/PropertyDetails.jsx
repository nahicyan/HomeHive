import React from "react";
import PropertyDetailsLeft from "../PropertyDetailsLeft/PropertyDetailsLeft";
import PropertyDetailsRight from "../PropertyDetailsRight/PropertyDetailsRight";

export default function PropertyDetails({ propertyData }) {
  return (
    <div className="w-full bg-[#FDF8F2]">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-2">
        
        {/* Left Section: Slightly more than 2/3 of container */}
        <div className="w-full lg:basis-[69%]">
          <PropertyDetailsLeft propertyData={propertyData} />
        </div>

        {/* Right Section: Slightly less than 1/3 of container */}
        <div className="w-full lg:basis-[31%]">
        <PropertyDetailsRight propertyData={propertyData} />
        </div>

      </div>
    </div>
  );
}
