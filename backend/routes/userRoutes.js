const express = require("express");
const router = express.Router();
const User = require("../models/user");

// TEST ROUTE
router.get("/test", (req, res) => {
    res.json({ message: "User route is working" });
});

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
