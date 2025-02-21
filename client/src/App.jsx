import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles"; // Import MUI ThemeProvider
import theme from "./theme"; // Our custom theme with colors
import Layout from "./components/Layout/Layout"; // Your layout component
import Site from "./pages/Site"; // Home page
import Properties from "./pages/Properties/Properties"; // Properties listing page
import Property from "./pages/Property/Property"; // Property detail page
import Offer from "./components/Offer/Offer"; // Offer component
import AddProperty from "./pages/AddProperty/AddProperty"; // Add Property page
import EditProperty from "./pages/EditProperty/EditProperty"; // Edit Property page
import DFW from "./components/DFW/DFW"; // DFW Property page
import Austin from "./components/Austin/Austin"; // Austin Property page
import Houston from "./components/Houston/Houston"; // Houston Property page
import SanAntonio from "./components/SanAntonio/SanAntonio"; // San Antonio Property page
import OtherLands from "./components/OtherLands/OtherLands"; // Other Lands Property page
import { UserDetailProvider } from "./utils/UserContext"; // User context provider
import { Auth0Provider } from "@auth0/auth0-react";

// Create the React Query client
const queryClient = new QueryClient();

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_SERVER_URL;
const scope = import.meta.env.VITE_AUTH0_SCOPE;

function App() {
  return (
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
      }}
      audience = {audience}
      scope = {scope}
      cashLocation = "localStorage"
      useRefreshTokens = {true}
    >
      <UserDetailProvider>
        <QueryClientProvider client={queryClient}>
          {/* Wrap the app with MUI ThemeProvider for consistent styling */}
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Site />} />
                    <Route path="/properties">
                      <Route index element={<Properties />} />
                      <Route path=":propertyId" element={<Property />} />
                      <Route path=":propertyId/offer" element={<Offer />} />
                    </Route>
                    <Route path="/DFW" element={<DFW />} />
                    <Route path="/Austin" element={<Austin />} />
                    <Route path="/Houston" element={<Houston />} />
                    <Route path="/SanAntonio" element={<SanAntonio />} />
                    <Route path="/OtherLands" element={<OtherLands />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    <Route path="/edit-property/:propertyId" element={<EditProperty />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ThemeProvider>
          {/* Toast notifications container */}
          <ToastContainer />
          {/* React Query DevTools for debugging */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserDetailProvider>
    </Auth0Provider>
  );
}

export default App;
