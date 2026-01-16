const express = require("express");
const mongoose = require("mongoose");

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
// GET user by id
router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // check ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user by id error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
