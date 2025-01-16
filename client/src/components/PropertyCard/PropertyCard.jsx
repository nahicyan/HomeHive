import React from "react";
import './PropertyCard.css'
import { AiFillStar } from "react-icons/ai";
const PropertyCard = ({card}) => {
  return (
    <div className="flexColStart l-card">
      <img src={card.image} alt="Land" />
      <AiFillStar size={24} color="#ffB000"/>
      <span className="secondaryText l-price">
        <span style={{ color: "#FF8000" }}>$</span>
        <span>{card.askingPrice}</span>
      </span>
      <span className="primaryText">{card.address}</span>
      <span className="secondaryText">{card.description}</span>
    </div>
  );
};

export default PropertyCard;
