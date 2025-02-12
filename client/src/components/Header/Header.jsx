import React, { useState, useEffect, useContext } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkSession, loginUser, logoutUser } from "../../utils/api"; // Import logoutUser
import { UserContext } from "../../utils/UserContext";
import LoginModal from "../LoginModal/LoginModal";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [menuOpened, setMenuOpened] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check session on component mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await checkSession();
        if (response.user) {
          console.log("Session active:", response.user);
          setCurrentUser(response.user);
        } else {
          console.log("No active session");
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    checkUserSession();
  }, [setCurrentUser]);

  // Style for mobile menu
  const getMenuStyles = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: menuOpen ? "0" : "-100%" };
    }
    return {};
  };

  // Handle user login
  const handleLoginData = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      console.log("Login successful:", data);
      if (data.user) {
        setCurrentUser(data.user);
      }
      setShowLoginModal(false);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Handle logout using the imported logoutUser function
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      setCurrentUser(null);
      window.location.href = "/"; // Redirect to homepage manually
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  // Determine the button label
  const getButtonLabel = () => {
    if (!currentUser) return "Login";
    return `Welcome, ${currentUser.name}`;
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo.png" alt="HomeHive Logo" width={175} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="http://buyyourland.com">Sell</a>
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {!currentUser ? (
              <button className="button" onClick={() => setShowLoginModal(true)}>
                {getButtonLabel()}
              </button>
            ) : (
              <>
                <button className="button">{getButtonLabel()}</button>
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

      {/* Render the LoginModal */}
      {showLoginModal && (
        <LoginModal onSubmit={handleLoginData} onClose={() => setShowLoginModal(false)} />
      )}
    </section>
  );
};

export default Header;
