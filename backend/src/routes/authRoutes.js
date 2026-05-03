import express from 'express';
import { register, login, getMe, getUserByEmail } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/user-by-email', protect, getUserByEmail);

export default router;
