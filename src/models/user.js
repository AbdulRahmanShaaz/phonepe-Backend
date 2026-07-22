const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
        },
        password: {
            type: String,
            required: true,
        },
        upID: {
            type: String,
            unique: true,
            trim: true,
        },
        balance: {
            type: Number,
            default: 0,
            min: 0,
        },
        MPIN: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;