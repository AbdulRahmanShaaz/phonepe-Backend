const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
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
            min: 1,
        },
        billerName: {
            type: String,
            default: null,
            trim: true,
        },
        types: {
            type: String,
            enum: [
                "Transfer",
                "ADD-MONEY",
                "Withdrawal",
                "BillPayment",
            ],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "completed",
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;