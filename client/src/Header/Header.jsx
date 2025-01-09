import React from "react";
import './Header.css'
const Header = () => {
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src="./logo.png" alt="Landers-Logo" width={175} />
        <div className="flexCenter h-menu">
          <button className="button">
            <a href="">Property Listing</a>
          </button>
          <a href="">Sell</a>
          <a href="">Support</a>
          <a href="">About Us</a>
          <a href="">Contact Us</a>
          <a href="">Login</a>
        </div>
      </div>
    </section>
  );
};

export default Header;
