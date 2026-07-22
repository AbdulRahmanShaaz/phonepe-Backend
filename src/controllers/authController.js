const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    if(!name||!email||!phone||!password){
    res.status(400).json({message:"please fill all the fields"})
    }
    try {
        const userExists = await User.findOne({$or:[{ email },{phone}]});
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sanitizedName = email.toLowerCase();
        const upID = `${sanitizedName.split("@")[0]}@phonepe`;
        const user = await User.create({ name, email, phone, password: hashedPassword,upID});
        await user.save();
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                upID:user.upID,
                balance:user.balance,
                hasMpinSet:false,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(400).json({message:"User not Found"})
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                upID: user.upID,
                balance: user.balance,
                hasMpinSet: !!user.MPIN,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password ");
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                upID: user.upID,
                balance: user.balance,
                hasMpinSet: !!user.MPIN,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const setMpin = async (req, res) => {
    const { mpin } = req.body;

    // Validate input
    if (!/^\d{4}$/.test(mpin)) {
        return res.status(400).json({
            message: "MPIN must be exactly 4 digits",
        });
    }

    try {
        // Optional: Prevent resetting if MPIN already exists
        if (req.user.MPIN) {
            return res.status(400).json({
                message: "MPIN has already been set",
            });
        }

        // Hash the MPIN
        const salt = await bcrypt.genSalt(10);
        const hashedMpin = await bcrypt.hash(mpin, salt);

        // Save hashed MPIN
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { MPIN: hashedMpin },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "MPIN set successfully",
        });

    } catch (error) {
        console.error("Error setting MPIN:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, setMpin };





