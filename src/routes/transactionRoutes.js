const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/protect");
const {
    sendMoney,
    getTransactionHistory,
} = require("../controllers/transactionController");

/*  #swagger.tags = ['Transactions']
    #swagger.summary = 'Send Money'
    #swagger.description = 'Transfers money from the authenticated user to another user using Email, Phone or UPI ID.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["receiverUpiId","amount","mpin"],
                    properties: {
                        receiverUpiId: {
                            type: "string",
                            example: "shaaz@phonepe"
                        },
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
        description: 'Money sent successfully.'
    }

    #swagger.responses[400] = {
        description: 'Validation failed.'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized.'
    }

    #swagger.responses[404] = {
        description: 'Receiver not found.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.post("/send", protect, sendMoney);

/*  #swagger.tags = ['Transactions']
    #swagger.summary = 'Transaction History'
    #swagger.description = 'Returns all transactions where the authenticated user is either the sender or receiver.'

    #swagger.security = [{
        "BearerAuth": []
    }]

    #swagger.responses[200] = {
        description: 'Transaction history fetched successfully.'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized.'
    }

    #swagger.responses[500] = {
        description: 'Internal Server Error.'
    }
*/
router.get("/history", protect, getTransactionHistory);

module.exports = router;