import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Add username state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        username,  // Add username to the request body
        password,
      });
  
      // Store the JWT token in localStorage
      localStorage.setItem("token", res.data.token);
  
      // Redirect to the homepage or dashboard
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err);
      setError("Registration failed, please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
      <form onSubmit={handleRegister} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
