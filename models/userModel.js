const mongoose = require('mongoose');
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

const User = mongoose.model('User', userSchema);

module.exports = User;
