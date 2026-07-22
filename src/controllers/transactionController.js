const Transaction = require("../models/Transaction");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const sendMoney = async (req, res) => {
    try {
        const { receiverUpiId, amount, mpin } = req.body;
        const senderId = req.user._id;

        if (!receiverUpiId || !amount || !mpin) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0",
            });
        }

        const sender = await User.findById(senderId);

        if (!sender) {
            return res.status(404).json({
                message: "Sender not found",
            });
        }

        if (!sender.MPIN) {
            return res.status(400).json({
                message: "Please set your MPIN first",
            });
        }

        const isMpinValid = await bcrypt.compare(
            mpin,
            sender.MPIN
        );

        if (!isMpinValid) {
            return res.status(401).json({
                message: "Invalid MPIN",
            });
        }

        if (sender.balance < Number(amount)) {
            return res.status(400).json({
                message: "Insufficient balance",
            });
        }

        const receiver = await User.findOne({
            $or: [
                { email: receiverUpiId.toLowerCase() },
                { phone: receiverUpiId },
                { upID: receiverUpiId }
            ]
        });

        if (!receiver) {
            return res.status(404).json({
                message: "Receiver not found",
            });
        }

        if (sender._id.toString() === receiver._id.toString()) {
            return res.status(400).json({
                message: "Cannot send money to yourself",
            });
        }

        sender.balance -= Number(amount);
        receiver.balance += Number(amount);

        await sender.save();
        await receiver.save();

        const transaction = await Transaction.create({
            sender: sender._id,
            receiver: receiver._id,
            amount: Number(amount),
            types: "Transfer",
            status: "completed",
        });

        return res.status(200).json({
            message: "Money sent successfully",
            transaction,
        });

    } catch (error) {
        console.error("Error sending money:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};
const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { sender: req.user._id },
                { receiver: req.user._id },
            ],
        })
            .populate("sender", "name email phone upID")
            .populate("receiver", "name email phone upID")
            .sort({ createdAt: -1 });

        return res.status(200).json(transactions);

    } catch (error) {
        console.error("Error fetching transaction history:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    sendMoney,
    getTransactionHistory,
};