import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";
import LoginModal from "../LoginModal/LoginModal"; // Adjust the path as necessary

// Utility to get and set cookies
const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [menuOpened, setMenuOpened] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load user from cookie on mount
  useEffect(() => {
    const userCookie = getCookie("loggedInUser");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userCookie));
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user cookie:", err);
      }
    }
  }, [setCurrentUser]);

  // Style for mobile menu
  const getMenuStyles = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: menuOpen ? "0" : "-100%" };
    }
    return {};
  };

  // Callback function to handle login data from the modal
  const handleLoginData = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      console.log("Login Success:", data);
      if (data.user) {
        setCurrentUser(data.user);
        setCookie("loggedInUser", encodeURIComponent(JSON.stringify(data.user)));
      }
      setShowLoginModal(false);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    deleteCookie("loggedInUser");
  };

  // Button label
  const getButtonLabel = () => {
    if (!currentUser) return "Login";
    if (currentUser.role === "ADMIN") {
      return `Welcome ${currentUser.name}!`;
    }
    return currentUser.name;
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo.png" alt="Landers-Logo" width={175} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="http://buyyourland.com">Sell</a>
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/About Us">About</NavLink>
            <NavLink to="/Contact Us">Contact</NavLink>

            {/* If user not logged in, show Login; otherwise show user info */}
            {!currentUser ? (
              <button className="button" onClick={() => setShowLoginModal(true)}>
                {getButtonLabel()}
              </button>
            ) : (
              <>
                <button className="button">{getButtonLabel()}</button>
                {/* If admin, show Add Property button */}
                {currentUser.role === "ADMIN" && (
                  <button className="button" onClick={() => navigate("/add-property")}>
                    Add Property
                  </button>
                )}
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {/* Render the LoginModal when showLoginModal is true */}
      {showLoginModal && (
        <LoginModal
          onSubmit={handleLoginData}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </section>
  );
};

export default Header;
