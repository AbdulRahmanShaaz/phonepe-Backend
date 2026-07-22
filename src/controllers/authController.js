const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: "Please fill all the fields",
        });
    }

    try {
        const userExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { phone }
            ]
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sanitizedEmail = email.toLowerCase();

        const upID = `${sanitizedEmail.split("@")[0]}@phonepe`;

        const user = await User.create({
            name,
            email: sanitizedEmail,
            phone,
            password: hashedPassword,
            upID,
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            upID: user.upID,
            balance: user.balance,
            hasMpinSet: !!user.MPIN,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields",
        });
    }

    try {
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            upID: user.upID,
            balance: user.balance,
            hasMpinSet: !!user.MPIN,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("Error logging in:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            upID: user.upID,
            balance: user.balance,
            hasMpinSet: !!user.MPIN,
        });

    } catch (error) {
        console.error("Error fetching profile:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

const setMpin = async (req, res) => {
    const { mpin } = req.body;

    if (!mpin) {
        return res.status(400).json({
            message: "MPIN is required",
        });
    }

    if (!/^\d{4}$/.test(mpin)) {
        return res.status(400).json({
            message: "MPIN must be exactly 4 digits",
        });
    }

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.MPIN) {
            return res.status(400).json({
                message: "MPIN has already been set",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedMpin = await bcrypt.hash(mpin, salt);

        user.MPIN = hashedMpin;

        await user.save();

        return res.status(200).json({
            message: "MPIN set successfully",
        });

    } catch (error) {
        console.error("Error setting MPIN:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    setMpin,
};