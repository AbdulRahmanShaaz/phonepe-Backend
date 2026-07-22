const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
        const sanitizedName = email.lowerCase()
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
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { registerUser };


