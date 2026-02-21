import express from 'express'
import { adminMiddleware, authMiddleware } from '../middlewares/auth.js';
import { getAllUsers } from '../controllers/userController.js';

const userRouter = express.Router();

// Route for authenticated users
userRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
});

// Route for admin only
userRouter.get("/all-users", authMiddleware, adminMiddleware, getAllUsers);

export default userRouter;