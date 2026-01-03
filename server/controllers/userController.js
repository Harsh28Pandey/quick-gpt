import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

// generate token function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// api to register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const user = await User.create({ name, email, password })

        const token = generateToken(user._id)

        return res.status(201).json({
            success: true,
            token
        })

    } catch (error) {
        console.error(error) // 👈 see real error only in terminal

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// api to login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = generateToken(user._id)

        return res.json({
            success: true,
            token
        })

    } catch (error) {
        console.error("Login error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// api to get user details
export const getUser = async (req, res) => {
    try {
        const user = req.user
        return res.json({
            success: true,
            user
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}