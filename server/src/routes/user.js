import express from 'express'
import { registerNewUser, signinUser } from '../controllers/user.js';

const userRouter = express.Router();

// POST: Register a User
userRouter.post('/register', registerNewUser);

// POST: Signin
userRouter.post('/signin', signinUser);

export default userRouter;