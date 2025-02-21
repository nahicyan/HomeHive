import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserDetailContext } from "../../utils/UserContext";

export default function Layout() {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Whenever the user is authenticated, retrieve an access token and store it (along with user details) in context.
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated && user) {
        try {
          // Retrieve a token from Auth0 using a popup (you could also use getAccessTokenSilently).
          const token = await getAccessTokenWithPopup({
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: import.meta.env.VITE_AUTH0_SCOPE,
          });

          // Store user info and token in our context (which may also persist it to localStorage).
          setUserDetails({
            email: user.email,
            name: user.name,
            picture: user.picture,
            accessToken: token,
          });
        } catch (err) {
          console.error("Failed to fetch access token:", err);
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, user, setUserDetails]);

  return (
    <div className="bg-[#FDF8F2] text-[#333] min-h-screen overflow-x-hidden flex flex-col">
      {/* Sticky Header with same background */}
      <header className="sticky top-0 z-50 bg-[#FDF8F2]">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer with a slightly darker beige or complementary color */}
      <footer className="bg-[#EFE8DE]">
        <Footer />
      </footer>
    </div>
  );
}
