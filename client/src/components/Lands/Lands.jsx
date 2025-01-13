import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Lands.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";

export const Lands = () => {
  return (
    <section className="l-wrapper">
      <div className="paddings innerWidth l-container">
        <div className="l-head flexColStart">
          <span className="orangeText">New Properties</span>
          <span className="primaryText">
            Check out what just become available
          </span>
        </div>
        <Swiper {...sliderSettings}>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart l-card">
                <img src={card.image} alt="Land" />
                <span className="secondaryText l-price">
                  <span style={{ color: "#FF8000" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
          <SliderButtons />
        </Swiper>
      </div>
    </section>
  );
};

export default Lands;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter l-buttons">
      <button onClick={()=>swiper.slidePrev()}>&lt;</button>
      <button onClick={()=>swiper.slideNext()}>&gt;</button>
    </div>
  );
};
