import User from '../models/user.js'
import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
const saltRounds = 10

export const registerNewUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists!');
        }

        // Hash the password
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        
        // Create the user in the db
        await User.create(req.body)
        return res.send('User Registered Successfully!!')

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).send('Registration failed. Please try again later.');
    }
}


