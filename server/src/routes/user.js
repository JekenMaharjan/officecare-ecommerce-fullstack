import express from 'express'
import { registerNewUser } from "../controllers/user.js"
const userRouter = express.Router();

userRouter.post('/register', registerNewUser);

export default userRouter;