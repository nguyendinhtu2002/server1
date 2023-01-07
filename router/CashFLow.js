import express from "express"
const router = express.Router()
import { createCashFlow, deleteById, getAll, getByUser,getByUserDeposit } from "../controller/cashFlowController.js"
import { protect } from "../Middleware/AuthMiddleware.js"

router.post('/', protect, createCashFlow)
router.get('/', protect, getByUser)
router.get('/getByUserDeposit', protect, getByUserDeposit)
router.get('/all',getAll)
router.delete('/:_id',deleteById)
export default router