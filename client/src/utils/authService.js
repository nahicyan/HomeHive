// src/utils/authService.js
import { registerUser } from "./api";

/**
 * syncAuth0User - Sync the Auth0 user with your backend.
 * If the user doesn't exist, a new user record is created.
 * If the user already exists, the backend returns a 409 error.
 *
 * @param {Object} auth0User - The user object from Auth0 (e.g., user.email, user.name, etc.).
 * @param {string} token - The Auth0 access token.
 * @returns {Promise<Object>} - The backend response containing the user.
 */
export const syncAuth0User = async (auth0User, token) => {
  // Build the registration data using fields from the Auth0 user.
  const registerData = {
    email: auth0User.email,
    name: auth0User.name,
    image: auth0User.picture,
    role: "USER", // Default role; adjust as needed.
  };

  try {
    // Pass the token to registerUser so it can attach it to the request headers
    const response = await registerUser(registerData, token);
    console.log("User sync successful:", response);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // 409 indicates that the user already exists.
      console.warn(`User already exists: ${auth0User.email}`);
    } else {
      console.error("Error syncing Auth0 user with backend:", error);
    }
    throw error; // Propagate error if needed.
  }
};
