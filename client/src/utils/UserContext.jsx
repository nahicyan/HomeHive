import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserDetailContext = createContext(null);

// Create the provider
export const UserDetailProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    // Optional: load from localStorage on init
    const saved = localStorage.getItem("userDetails");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // Whenever userDetails changes, optionally persist to localStorage
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("userDetails");
    }
  }, [userDetails]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};
