// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api'; // Import login and register functions from api.js

// Create Context for authentication state
const AuthContext = createContext();

// Provide the context to the app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Retrieve token from localStorage
  const [loading, setLoading] = useState(true); // Loading state for checking authentication
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated on app load
  useEffect(() => {
    if (authToken) {
      fetchUserDetails();
    } else {
      setLoading(false); // If no token, just set loading to false
    }
  }, [authToken]);

  const fetchUserDetails = async () => {
    try {
      // Assuming you have a protected endpoint to fetch user info (you can adjust if needed)
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set user data on successful verification
      } else {
        logoutUser(); // If verification fails, log out the user
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      logoutUser();
    } finally {
      setLoading(false); // Finished loading
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token); // Save token to localStorage
      setAuthToken(response.token); // Set token in the state
      setUser(response.user); // Set user data in the state
      navigate('/'); // Redirect to home or dashboard after successful login
    } catch (err) {
      setError(err);
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const response = await registerUser(email, password);
      localStorage.setItem('token', response.token); // Save token to localStorage
      setAuthToken(response.token); // Set token in the state
      setUser(response.user); // Set user data in the state
      navigate('/'); // Redirect to home or dashboard after successful register
    } catch (err) {
      setError(err);
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuthToken(null); // Clear token in state
    setUser(null); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  // Context values
  const contextValue = {
    user,
    login,
    register,
    logoutUser,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
