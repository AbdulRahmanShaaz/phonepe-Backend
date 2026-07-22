const express = require("express");
const {registerUser,  loginUser,getUserProfile,setMpin} = require("../controllers/authController");
const {protect} = require("../middlewares/protect");
const router = express.Router();


/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Register a new user'
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
        description: 'Internal server error.'
    }
*/
router.post("/register", registerUser);
/*  #swagger.tags = ['Authentication']
    #swagger.summary = 'Login user'
    #swagger.description = 'Authenticates a user and returns a JWT token.'

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["email","password"],
                    properties: {
                        email:{
                            type:"string",
                            example:"shaaz@gmail.com"
                        },
                        password:{
                            type:"string",
                            example:"Password@123"
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[200] = {
        description:'Login successful.'
    }

    #swagger.responses[401] = {
        description:'Invalid credentials.'
    }

    #swagger.responses[500] = {
        description:'Internal server error.'
    }
*/
router.post("/login", loginUser); 
router.post("/set-mpin",protect,setMpin)
router.get("/profile",protect,getUserProfile)



module.exports = router;