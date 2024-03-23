const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    work: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});


// Hashing the password before saving
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const hashedCpassword = await bcrypt.hash(user.confirmPassword, 10)
        user.password = hashedPassword;
        user.confirmPassword = hashedCpassword
        next();
    } catch (error) {
        return next(error);
    }
});


// Generating auth token using JWT
userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRETKEY); // Change 'your_secret_key' to your actual secret key
    return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User
