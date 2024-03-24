const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {

    try {
        // Get token from cookie
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "please login first" });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);

        // Get user details from decoded token
        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Attach user object to request for further use in routes
        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticateUser;
