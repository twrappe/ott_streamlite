import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Import the middleware here

const router = express.Router();

router.get('/', (req, res) => {
    res.send('🔐 Auth route is live');
});
router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Protected test route
router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to your profile!', user: req.user });
  });

export default router;
