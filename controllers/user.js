const User = require("../models/userModel")
const bcrypt = require("bcrypt")

// Controller function to create a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phoneNumber, work } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create a new user object
        const newUser = new User({ name, email, password, confirmPassword, phoneNumber, work });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if a user with the provided email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = user.generateAuthToken();
        // console.log(token)

        // Store token in cookie
        res.cookie('authToken', token, {
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
            httpOnly: true // Cookie is accessible only through HTTP(S) requests
        });
        // If both email and password are correct, respond with user information
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


