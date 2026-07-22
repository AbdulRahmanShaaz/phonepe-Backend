const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "PhonePe Backend API",
        description: "API documentation for the PhonePe backend"
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);