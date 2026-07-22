const mongoose = require("mongoose")
const User = require("../models/user");
const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    billerName:{
        type: String,
        default:null
    },
    types: {
        type: String,
        enum: ["Transfer", "ADD-MONEY", "Withdrawl","BillPayment"],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "completed",
    },
}, {
    timestamps: true,
});
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
