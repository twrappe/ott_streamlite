import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/api'; // Your Axios instance

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Token invalid:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    };

    verifyToken();
  }, [token]);

  const loginUser = async (credentials) => {
    try {
      const res = await axios.post('/auth/login', credentials);
      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const registerUser = async (credentials) => {
    try {
      const res = await axios.post('/auth/register', credentials);
      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser(res.data.user);
    } catch (err) {
      console.error("Registration failed:", err);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
