require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const walletRoutes = require("./src/routes/walletRoutes");

// Swagger
let swaggerDocument = {};

try {
    swaggerDocument = require("./swagger-output.json");
} catch (error) {
    console.error("Failed to load swagger-output.json");
    console.error(error.message);
}

const app = express();

/* ------------------------- */
/*        MIDDLEWARE         */
/* ------------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------- */

connectDB();


app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
        explorer: true,
        customSiteTitle: "PhonePe Backend API Documentation",
    })
);


app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "PhonePe Backend is running successfully 🚀",
    });
});


/*          ROUTES           */


app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallet", walletRoutes);

/*      404 HANDLER          */


app.use( (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
});