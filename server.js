const express = require('express');
const connectDB = require("./src/config/db");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
let swaggerDocument = {} 
try{
    swaggerDocument = require("./swagger-output.json")
}catch(err){
    console.error("Error loading swagger Document",err)
}
require("dotenv").config();
const app = express();
app.use(cors());
// app.use(express.json());
connectDB();
const port = process.env.PORT || 5000;
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument)))
app.get("/health",(req,res)=>{
    res.send("Phonepe Backend system is running ")
})
app.use("/api/auth",authRoutes)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`)
})