import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkSession, loginUser, logoutUser } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";
import LoginModal from "../LoginModal/LoginModal";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDF8F2] border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" title="Landivo">
              <img className="w-auto h-10 lg:h-12" src="https://shinyhomes.net/wp-content/uploads/2025/02/Landivo.svg" alt="Logo" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            {["Properties", "Sell", "Financing", "About Us", "Support"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-base font-medium text-[#333] transition hover:text-[#576756]"
              >
                {item}
              </Link>
            ))}

            {/* Login / User Dropdown */}
            {!currentUser ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-3 text-base font-semibold text-white bg-[#576756] rounded-md hover:bg-[#001530] transition"
              >
                Login / Sign Up
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-5 py-3 text-base font-semibold text-white bg-[#576756] rounded-md hover:bg-[#001530] transition flex items-center"
                >
                  {`Welcome, ${currentUser.name}`}
                  <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button onClick={() => navigate("/add-property")} className="block px-4 py-2 text-sm text-[#333] hover:bg-gray-100">
                      Add Property
                    </button>
                    <button onClick={() => navigate("/offers")} className="block px-4 py-2 text-sm text-[#333] hover:bg-gray-100">
                      Offers
                    </button>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-[#FDF8F2] border-t border-gray-200 shadow-md py-4">
          <div className="flex flex-col space-y-2 px-6">
            {["Properties", "Sell", "Financing", "About Us", "Support"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase().replace(/\s/g, "-")}`} className="py-2 text-base font-medium text-[#333] hover:text-[#576756]">
                {item}
              </Link>
            ))}

            {!currentUser ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full px-5 py-3 text-base font-semibold text-white bg-[#576756] rounded-md hover:bg-[#001530] transition"
              >
                Login / Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full px-5 py-3 text-base font-semibold text-white bg-[#2C5F2D] rounded-md hover:bg-[#244a20] transition"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}

      {showLoginModal && <LoginModal onSubmit={handleLoginData} onClose={() => setShowLoginModal(false)} />}
    </header>
  );
};

export default Header;
