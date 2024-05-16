import express from 'express';
import {
  facebookLogin,
  googleLogin,
  logout,
  protect,
  signup,
  verifyEmail,
} from '../../controllers/authentication';
import passport, { facebookCallBack } from '../../config/passport';
import { authenticate } from 'passport';
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.get('/logout', protect, logout);
authRouter.get('/verify-email/:token', verifyEmail);
authRouter.get('/facebook', passport.authenticate('facebook'));
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  facebookLogin,
);
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8080',
    scope: ['email', 'profile'],
  }),
  googleLogin,
);
export default authRouter;
