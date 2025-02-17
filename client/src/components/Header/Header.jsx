import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkSession, loginUser, logoutUser } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";
import LoginModal from "../LoginModal/LoginModal";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await checkSession();
        if (response.user) {
          setCurrentUser(response.user);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };
    checkUserSession();
  }, [setCurrentUser]);

  const handleLoginData = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      if (data.user) setCurrentUser(data.user);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getButtonLabel = () => (currentUser ? `Welcome, ${currentUser.name}` : "Login / Register");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#F5F4EF", boxShadow: "none", borderBottom: "1px solid #DDD" }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "10px 20px" }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            fontWeight: 700,
            color: "#2A3B2D",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Landivo
        </Typography>

        {/* Center Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <NavLink className="menu-link" to="/properties">
            Properties
          </NavLink>
          <NavLink className="menu-link" to="/latest-projects">
            Latest Projects
          </NavLink>
          <NavLink className="menu-link" to="/readymoves">
            ReadyMoves
          </NavLink>
          <NavLink className="menu-link" to="/contact">
            Contact
          </NavLink>
        </Box>

        {/* Login / Logout Button */}
        <Box>
          {!currentUser ? (
            <Button variant="contained" sx={loginButtonStyles} onClick={() => setShowLoginModal(true)}>
              {getButtonLabel()}
            </Button>
          ) : (
            <>
              <Button variant="text" sx={{ ...loginButtonStyles, color: "#2A3B2D" }}>
                {getButtonLabel()}
              </Button>
              <Button variant="outlined" sx={{ ...loginButtonStyles, ml: 2 }} onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: "none" }, color: "#2A3B2D" }}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Dropdown Menu */}
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
          <MenuItem onClick={() => navigate("/properties")}>Properties</MenuItem>
          <MenuItem onClick={() => navigate("/latest-projects")}>Latest Projects</MenuItem>
          <MenuItem onClick={() => navigate("/readymoves")}>ReadyMoves</MenuItem>
          <MenuItem onClick={() => navigate("/contact")}>Contact</MenuItem>
        </Menu>
      </Toolbar>

      {showLoginModal && (
        <LoginModal onSubmit={handleLoginData} onClose={() => setShowLoginModal(false)} />
      )}
    </AppBar>
  );
};

const loginButtonStyles = {
  backgroundColor: "#2A3B2D",
  color: "#FFFFFF",
  borderRadius: "25px",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1F2B23",
  },
};

export default Header;
