const express = require("express")
const router = express.Router()
const { createCashFlow, deleteById, getAll, getByUser, getByUserDeposit } = require("../controller/cashFlowController.js")
const { protect } = require("../Middleware/AuthMiddleware.js")

router.post('/', protect, createCashFlow)
router.get('/', protect, getByUser)
router.get('/getByUserDeposit', protect, getByUserDeposit)
router.get('/all', getAll)
router.delete('/:_id', deleteById)
module.exports = router