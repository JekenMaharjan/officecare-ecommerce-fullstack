import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user by email
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'E-mail not found!' })

        // Check password
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({ message: 'Invalid password!' })

        // Generate JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // Respond
        return res.json({
            message: 'Logged in successfully!',
            user,
            isLoggedIn: true,
            token
        })

    } catch (error) {
        console.error("SignIn error:", error)
        return res.status(500).json({ message: 'SignIn failed. Try again later.' })
    }
}
