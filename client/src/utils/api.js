import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import secureApi from './secureApi';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Update with your actual backend URL
  withCredentials: true, // Enable cookies for cross-origin requests
});

// Helper function to handle errors and provide consistent logging
const handleRequestError = (error, message) => {
  console.error(`${message}:`, error);
  throw error;
};

// Example function to check session status
export const checkSession = async () => {
  try {
    const response = await axios.get('http://localhost:8200/auth/test-session', {
      withCredentials: true,
    });
    console.log("Session response:", response.data);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Session failed");
  }
};

// Login function using session-based authentication
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/api/user/login', loginData, {
      withCredentials: true, // This ensures cookies are sent and received
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


// Logout function to end session
export const logoutUser = async () => {
  try {
    const response = await axios.get('http://z:8200/auth/logout', {
      withCredentials: true,
    });
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Logout failed");
  }
};

export const registerUser = async (registerData, token) => {
  try {
    // Pass the token in the headers so your backend can validate it
    const response = await api.post('/api/user/register', registerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Registration failed");
  }
};

// Get all properties
export const getAllProperties = async () => {
  try {
    const response = await api.get('/api/residency/allresd');
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to fetch properties");
  }
};

// Get a specific property
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/api/residency/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to fetch property details");
  }
};

// Make an offer on a property
export const makeOffer = async (offerData) => {
  try {
    const response = await secureApi.post('/api/buyer/makeOffer', offerData);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to make offer");
  }
};

// Update property
export const updateProperty = async (id, updatedData) => {
  try {
    const response = await secureApi.put(`/api/residency/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to update property");
  }
};

// Get offers for a specific property
export const getPropertyOffers = async (propertyId) => {
  try {
    const response = await secureApi.get(`/api/buyer/offers/property/${propertyId}`);
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to fetch property offers");
  }
};

// In your api.js file
export const createResidencyWithFiles = async (formData) => {
  try {
    const response = await secureApi.post('/api/residency/createWithFile', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error, "Failed to create property with files");
  }
};

