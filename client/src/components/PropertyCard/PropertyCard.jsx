import React from "react";
import './PropertyCard.css'
import { AiFillStar } from "react-icons/ai";
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
const PropertyCard = ({card}) => {
  const navigate = useNavigate();
  return (
    <div className="flexColStart l-card" onClick={()=>navigate(`../properties/${card.id}`)}>
      <img src={card.image} alt="Land" />
      <AiFillStar size={24} color="#ffB000"/>
      <span className="secondaryText l-price">
        <span style={{ color: "#FF8000" }}>$</span>
        <span>{card.askingPrice}</span>
      </span>
      <span className="primaryText">{truncate(card.address, {length:20})}</span>
      <span className="secondaryText">{truncate(card.description, {length:55})}</span>
    </div>
  );
};

export default PropertyCard;
