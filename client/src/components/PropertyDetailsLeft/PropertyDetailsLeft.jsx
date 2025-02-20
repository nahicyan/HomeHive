import React from "react";
import PropertyHighlights from "../PropertyHighlights/PropertyHighlights";
export default function PropertyDetailsLeft({ propertyData }) {
  return (
    <div className="p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Property Highlights
      </h2>

      {/* Quick Facts Card Group */}
      <PropertyHighlights propertyData={propertyData} />
    </div>
  );
}
