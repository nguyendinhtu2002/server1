const express = require("express")
const router = express.Router()
const { protect } = require("../Middleware/AuthMiddleware.js")
const { createAddFunds, getAddFundsAll, getByUser } = require("../controller/AdsFundsController.js")
router.post('/', protect, createAddFunds)
router.get('/', protect, getAddFundsAll)
router.get('/getByUser', protect, getByUser)
module.exports = router