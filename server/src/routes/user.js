import express from 'express'
import { registerNewUser, signinUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/register', registerNewUser);
userRouter.post('/signin', signinUser);

export default userRouter;