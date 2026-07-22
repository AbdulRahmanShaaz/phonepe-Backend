const User = require("../models/user");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");

const addMoney = async (req, res) => {
    try {
        const { amount, mpin } = req.body;
        const userId = req.user._id;

        if (!amount || !mpin) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.MPIN) {
            return res.status(400).json({
                message: "Please set your MPIN first",
            });
        }

        const isMpinValid = await bcrypt.compare(
            mpin,
            user.MPIN
        );

        if (!isMpinValid) {
            return res.status(401).json({
                message: "Invalid MPIN",
            });
        }

        user.balance += Number(amount);

        await user.save();

        const transaction = await Transaction.create({
            sender: user._id,
            receiver: user._id,
            amount: Number(amount),
            types: "ADD-MONEY",
            status: "completed",
        });

        return res.status(200).json({
            message: "Money added successfully",
            balance: user.balance,
            transaction,
        });

    } catch (error) {
        console.error("Error adding money:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};
const payBill = async (req, res) => {
    try {
        const { billerName, amount, mpin } = req.body;
        const userId = req.user._id;

        if (!billerName || !amount || !mpin) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.MPIN) {
            return res.status(400).json({
                message: "Please set your MPIN first",
            });
        }

        const isMpinValid = await bcrypt.compare(
            mpin,
            user.MPIN
        );

        if (!isMpinValid) {
            return res.status(401).json({
                message: "Invalid MPIN",
            });
        }

        if (user.balance < Number(amount)) {
            return res.status(400).json({
                message: "Insufficient balance",
            });
        }

        user.balance -= Number(amount);

        await user.save();

        const transaction = await Transaction.create({
            sender: user._id,
            receiver: user._id,
            amount: Number(amount),
            billerName,
            types: "BillPayment",
            status: "completed",
        });

        return res.status(200).json({
            message: "Bill paid successfully",
            balance: user.balance,
            transaction,
        });

    } catch (error) {
        console.error("Error paying bill:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    addMoney,
    payBill,
};