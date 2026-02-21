import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // exclude password
        res.json({ users });
    } catch (error) {
        console.error("GetAllUsers error:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};