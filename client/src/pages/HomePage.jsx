import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our OTT Platform</h1>
      <p className="text-lg mb-6">Stream your favorite movies and shows</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
