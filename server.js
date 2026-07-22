require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

let swaggerDocument = {};

try {
    swaggerDocument = require("./swagger-output.json");
} catch (err) {
    console.error("Error loading Swagger document:", err);
}
const app = express();
connectDB();
// app.use(cors());
app.use(express.json());
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
);
/*  #swagger.tags = ['Health']
    #swagger.summary = 'Health Check'
    #swagger.description = 'Checks whether the PhonePe backend server is running.'
    #swagger.responses[200] = {
        description: 'Server is running successfully.'
    }
*/

app.get("/health", (req, res) => {
    res.send("PhonePe Backend system is running");
});

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
});