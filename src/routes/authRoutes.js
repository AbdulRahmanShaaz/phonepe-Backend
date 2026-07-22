const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    setMpin,
} = require("../controllers/authController");

const { protect } = require("../middlewares/protect");

/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Register User'
    #swagger.description = 'Creates a new PhonePe user account.'

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["name","email","phone","password"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Shaaz"
                        },
                        email: {
                            type: "string",
                            example: "shaaz@gmail.com"
                        },
                        phone: {
                            type: "string",
                            example: "9876543210"
                        },
                        password: {
                            type: "string",
                            example: "Password@123"
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[201] = {
        description: 'User registered successfully.'
    }

    #swagger.responses[400] = {
        description: 'Missing fields or user already exists.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.post("/register", registerUser);

/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Login User'
    #swagger.description = 'Authenticates the user and returns a JWT token.'

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["email","password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "shaaz@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "Password@123"
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: 'Login successful.'
    }

    #swagger.responses[401] = {
        description: 'Invalid credentials.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.post("/login", loginUser);

/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Set MPIN'
    #swagger.description = 'Sets a 4-digit MPIN for the authenticated user.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["mpin"],
                    properties: {
                        mpin: {
                            type: "string",
                            example: "1234"
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: 'MPIN set successfully.'
    }

    #swagger.responses[400] = {
        description: 'Invalid MPIN or MPIN already exists.'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.post("/set-mpin", protect, setMpin);

/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Get User Profile'
    #swagger.description = 'Returns the profile details of the authenticated user.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.responses[200] = {
        description: 'Profile fetched successfully.'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized.'
    }

    #swagger.responses[404] = {
        description: 'User not found.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.get("/profile", protect, getUserProfile);

module.exports = router;