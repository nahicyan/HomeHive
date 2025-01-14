import React, { useState } from "react";
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi'
import OutsideClickHandler from "react-outside-click-handler";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const getMenuStyles = (menuOpened) => {
    if(document.documentElement.clientWidth <= 800)
    {
      return { right: menuOpened ? "0" : "-100%" };
    }
    //Logic for getting Menu button working under any width of 100
  }
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src="./logo.png" alt="Landers-Logo" width={175} />
        <OutsideClickHandler
        onOutsideClick={()=>{
          setMenuOpened(false)
        }}
        >
        <div className="flexCenter h-menu"

        style={getMenuStyles(menuOpened)}
        
        >
          <button className="button">
            <a href="">Property Listing</a>
          </button>
          <a href="">Sell</a>
          <a href="">Support</a>
          <a href="">About Us</a>
          <a href="">Contact Us</a>
          <a href="">Login</a>
        </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={()=>setMenuOpened ((prev)=>!prev)}>
          <BiMenuAltRight size={30}/>
        </div>
      </div>
    </section>
  );
};

export default Header;
