const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        upID: {
            type: String,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
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
const User = mongoose.model("user",userSchema)
module.exports = User; 