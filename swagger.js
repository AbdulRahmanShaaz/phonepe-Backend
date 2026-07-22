const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "PhonePe Backend API",
        description: "API documentation for the PhonePe Backend"
    },
    host: "localhost:5000",
    schemes: ["http"],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter your JWT token as: Bearer <token>"
        }
    }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);