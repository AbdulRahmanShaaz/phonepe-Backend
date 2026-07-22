const express = require("express")
const router = express.Router()
const{ protect } = require("../middlewares/protect")
const {payBill,addMoney} = require("../controllers/walletController");

router.post("/payBill",protect,payBill)
router.post("/addMoney",protect,addMoney)

module.exports = router;