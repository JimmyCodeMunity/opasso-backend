const express = require('express');
const User = require('../models/UserModel');
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" });

    }
}


//get all sellers
// const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             res.status(401).json({ error: 'Invalid password' });
//             return;
//         }

//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to login' });
//     }
// }


module.exports = {
    getAllUsers,
    // Login
}
