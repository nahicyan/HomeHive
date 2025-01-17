import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillStar } from "react-icons/ai";
import "./Property.css";
import { RxAngle } from "react-icons/rx";
import { TbDimensions } from "react-icons/tb";


const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While Fetching The Land Details</span>
        </div>
      </div>
    );
  }

  console.log("ID:", id);
  console.log("Data:", data);
  console.log("Image URL:", data?.image);

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <AiFillStar size={24} color="#ffB000" />
        </div>
        <img src={`/${data.image}`} alt="home image" />
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText" style={{ fontSize: "1.75rem" }}>
                {data?.address}
              </span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.askingPrice}
              </span>
            </div>
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <RxAngle size={20} color="#1F3E72"/>
                <span>Lot Type: {data?.facilities?.lotType}</span>
              </div>
              <div className="flexStart facility">
              <TbDimensions size={20} color="#1F3E72"/>
              <span>Dimensions {data?.facilities?.dimensions}</span>
              </div>
              <div className="flexStart facility"></div>
              <div className="flexStart facility"></div>
              <div className="flexStart facility"></div>
            </div>
          </div>
          <div className="right">Property Details</div>
        </div>
      </div>
    </div>
  );
};

export default Property;
