const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URl)
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error("Error Connect to DB", err)
        process.exit(1)

    }
}
module.exports = connectDB;