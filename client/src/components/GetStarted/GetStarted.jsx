import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import "./GetStarted.css";

export const GetStarted = () => {
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">
            Be the First to Know About New Listings
          </span>
          <span className="whiteText orangeText">
            Enter your Email to receive updates on the latest properties and
            unbeatable deals
          </span>
          <span>
            <div className="flexCenter search-bar">
              <HiOutlineMail className="mailIcon" color="#FF8000" size={25} />
              <input type="text" />
              <button className="button">Subscribe</button>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};
export default GetStarted;
