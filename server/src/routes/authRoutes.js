import express from 'express'
import { registerNewUser, signinUser } from '../controllers/authController.js';

const authRouter = express.Router();

// POST: Register a User
authRouter.post('/register', registerNewUser);

// POST: Signin
authRouter.post('/signin', signinUser);

export default authRouter;