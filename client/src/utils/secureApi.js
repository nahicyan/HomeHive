// src/hooks/useSecureApi.js
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const useSecureApi = () => {
  const { getAccessTokenWithPopup } = useAuth0();

  const secureApi = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
  });

  secureApi.interceptors.request.use(async (config) => {
    try {
      // Retrieve the access token using a popup
      const token = await getAccessTokenWithPopup({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: import.meta.env.VITE_AUTH0_SCOPE,
      });
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Error fetching access token with popup", error);
    }
    return config;
  });

  return secureApi;
};

export default useSecureApi;
