const express = require('express');
const User = require('../models/UserModel');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}



const getAllUsersByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await User.find({email});
        if(!user){
            res.status(404).json({message:'you have not added any item to cart'});
        }
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}

//get all sellers
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }

        if (user.status === 'Approved') {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(403).json({ error: 'Wait for account to be approved' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};



const createUser = async (req, res) => {
    try {
        const { name,email,password,address,phoneNumber } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            address,
            phoneNumber,
        });

        res.status(200).json(user);
        console.log('User account created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




const updateUserByEmail = async(req,res) =>{
    try {
    const { email } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Find the brand by its name
      req.body, // Update the brand with the request body data
      { new: true } // Return the updated brand as the response
    );

    // If brand fetched cannot be found
    if (!updatedUser) {
      return res.status(404).json({ message: `Cannot find user with email ${email}` });
    }

    res.status(200).json(updatedUser);
    console.log("Data updated successfully");

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}



const updateUserPasswordByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;

    // Check if newPassword is provided
    if (!password) {
      return res.status(400).json({ message: 'New password is required' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    // If user with the provided email is not found
    if (!updatedUser) {
      return res.status(404).json({ message: `Cannot find user with email ${email}` });
    }

    res.status(200).json(updatedUser);
    console.log('Password updated successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
    getAllUsers,
    Login,
    createUser,
    getAllUsersByEmail,
    updateUserByEmail,
    updateUserPasswordByEmail
}
