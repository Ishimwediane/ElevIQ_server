import express, { Router } from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import { 
  signup, 
  verifyEmail, 
  login, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController';
import { validate } from '../middleware/validationMiddleware';
import { 
  signupSchema, 
  verifyEmailSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from '../schema/authSchema';

const router: Router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/verify-email/:token', validate(verifyEmailSchema), verifyEmail);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);




router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  (req, res) => {
    const user = req.user as any;

    // Issue JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Send token as JSON or redirect to frontend with token
    res.json({ token, message: 'Google login successful' });
  }
);


export default router;