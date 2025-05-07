# OTT Platform (Full Stack App)

A simple Over-The-Top (OTT) media platform built with React, Node.js, Express, and MongoDB. Users can register, log in, and access protected routes using JWT authentication.

## 🚀 Features

- User registration and login
- JWT-based authentication
- Protected routes
- Media upload (coming soon)
- Responsive UI with Tailwind CSS

## 🛠 Tech Stack

**Frontend:**
- React
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt for password hashing

## 🧪 Setup Instructions

### 🔧 Backend

```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npm start
