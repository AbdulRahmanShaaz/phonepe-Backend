const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/protect");
const {
    addMoney,
    payBill,
} = require("../controllers/walletController");

/*  #swagger.tags = ['Wallet']
    #swagger.summary = 'Add Money'
    #swagger.description = 'Adds money to the authenticated user's wallet.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["amount","mpin"],
                    properties: {
                        amount: {
                            type: "number",
                            example: 500
                        },
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
        description: 'Money added successfully.'
    }

    #swagger.responses[400] = {
        description: 'Invalid request.'
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
router.post("/addMoney", protect, addMoney);

/*  #swagger.tags = ['Wallet']
    #swagger.summary = 'Pay Bill'
    #swagger.description = 'Pays a bill from the authenticated user's wallet.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["billerName","amount","mpin"],
                    properties: {
                        billerName: {
                            type: "string",
                            example: "Airtel"
                        },
                        amount: {
                            type: "number",
                            example: 999
                        },
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
        description: 'Bill paid successfully.'
    }

    #swagger.responses[400] = {
        description: 'Invalid request.'
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
router.post("/payBill", protect, payBill);

module.exports = router;