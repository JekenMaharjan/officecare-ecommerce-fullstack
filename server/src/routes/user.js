import express from 'express'
import { signinUser } from '../controllers/user.js';
const userRouter = express.Router();

userRouter.post('/signin', signinUser);

export default userRouter;