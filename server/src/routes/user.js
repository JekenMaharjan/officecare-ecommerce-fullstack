import express from 'express'
import { adminMiddleware, authMiddleware } from '../middlewares/auth.js';
import { getAllUsers } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
});

userRouter.get("/all-users", authMiddleware, adminMiddleware, getAllUsers);

export default userRouter;