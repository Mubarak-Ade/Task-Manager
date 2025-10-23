import express from "express";
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Missing Field" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hash });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Both Email and Password is required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "invalid password" });
        }

        const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: "7d" });

        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
