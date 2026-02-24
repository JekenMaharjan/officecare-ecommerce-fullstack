import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET;

// ============================================================================
// REGISTER USER
// ============================================================================
export const registerNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️. Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        // 2️. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        // 3️. Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4️. Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Registration failed. Please try again later.",
        });
    }
};

// ============================================================================
// SIGNIN USER
// ============================================================================
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send token and user info
        res.status(200).json({
            token,  // make sure this exists
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};