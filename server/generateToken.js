// generateToken.js

import jwt from 'jsonwebtoken';

// Sample user data (replace with real user data from your app)
const user = {
  id: '12345',  // Unique user ID
  username: 'tom_doe',  // Username or other identifying info
};

// Secret key to sign the token (keep this safe!)
const secretKey = 'your_jwt_secret_key';

// Set token expiration time (e.g., 1 hour)
const expiresIn = '1h';  // You can change this to '1d', '30m', etc.

// Generate the JWT token
const token = jwt.sign(
  { userId: user.id, username: user.username },  // Payload (user data)
  secretKey,  // Secret key to sign the token
  { expiresIn }  // Expiration time
);

console.log('Generated JWT Token:', token);
