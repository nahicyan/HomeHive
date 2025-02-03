import React from "react";
import "./PropertyCard.css";
import { AiFillStar } from "react-icons/ai";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/format";

// 1) Grab server URL from environment, defaulting to localhost
// If you’re using Vite:
// const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:8400";

const serverURL = import.meta.env.VITE_SERVER_URL;


const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart l-card"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      {/* 2) Build image src using serverURL */}
      <img src={`${serverURL}/${card.image}`} alt="Land" />

      <AiFillStar size={24} color="#ffB000" />

      <span className="secondaryText l-price">
        <span style={{ color: "#FF8000" }}>
          ${formatPrice(card.askingPrice)}
        </span>
        <span>{card.acre} Acres</span>
      </span>

      <span className="address primaryText">
        {truncate(card.address, { length: 20 })}
      </span>

      <span className="secondaryText">
        {card.city}, TX {card.zip}
      </span>
    </div>
  );
};

export default PropertyCard;
