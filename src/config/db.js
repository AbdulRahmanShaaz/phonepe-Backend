const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;