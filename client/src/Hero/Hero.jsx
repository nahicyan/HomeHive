import React from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <h1>
              Discover
              <br />
              Your Dream Land
              <br />
              Today
            </h1>
          </div>
          <div className="flexColStart hero-des">
            <span>
              Our mission is to simplify the land-buying
              <br /> experience by offering direct sales and expert guidance
            </span>
            <span>
              Whether you're seeking the perfect plot to build your dream home
              <br /> or a lucrative investment opportunity, <br /> we provide
              the tools and expertise to make it happen
            </span>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="#FF8000" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div>
          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
              <CountUp start={50} end={100} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Exclusive Listings!</span>
            </div>
            <div className="flexColStart stat">
              <span>
              <CountUp start={100} end={200} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Property Sold!</span>
            </div>
            <div className="flexColStart stat">
              <span>
              <CountUp start={100} end={150} duration={2}/>
              <span>+</span>
              </span>
              <span className="secondaryText">Happy Buyers</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="image-container">
            <img src="./banner.jpg" alt="Landers Banner" />
            {/* 3224 */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;