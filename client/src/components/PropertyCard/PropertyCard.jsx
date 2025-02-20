import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/format";

const serverURL = import.meta.env.VITE_SERVER_URL;

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  const images = card.image ? JSON.parse(card.image) : [];
  const firstImage = images.length > 0 ? `${serverURL}/${images[0]}` : "/default-image.jpg";

  return (
    <div
      // Outer container with gradient border and smooth shadow transitions
      className="group relative w-full max-w-[460px] h-[380px] rounded-xl p-1 bg-gradient-to-r from-white/40 via-white/20 to-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer"      onClick={() => navigate(`../properties/${card.id}`)}
    >
      {/* Inner container with the frosted glass effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/30 overflow-hidden">
        
        {/* Thinner Top Header */}
        <div className="py-1 px-3 bg-[#4b5b4d] text-white text-center">
          <h3
            className="text-sm font-medium truncate"
            dangerouslySetInnerHTML={{ __html: card.title }}
          />
        </div>

        {/* Image Section */}
        <div className="relative h-[55%] overflow-hidden">
          <img
            src={firstImage}
            alt="Property"
            className="w-full h-full object-cover brightness-90 transition-transform duration-300 transform group-hover:scale-105"
          />
        </div>

        {/* Thinner Bottom Info Section */}
        <div className="p-2">
          <div className="flex justify-between mb-1">
            <h4 className="text-base font-medium text-[#4b5b4d]">${formatPrice(card.askingPrice)}</h4>
            <p className="text-sm font-medium text-[#4b5b4d]">{card.acre} Acres</p>
          </div>
          <div className="flex justify-between text-[#4b5b4d] text-sm font-medium">
            <p>
              <strong>{card.city}</strong>, {card.state} {card.zip}
            </p>
            <p className="text-[#4b5b4d]">{card.county} County</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {card.ltag && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white bg-blue-600 shadow-md transition-transform duration-200 transform group-hover:scale-105">
                {card.ltag}
              </span>
            )}
            {card.rtag && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white bg-pink-600 shadow-md transition-transform duration-200 transform group-hover:scale-105">
                {card.rtag}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
