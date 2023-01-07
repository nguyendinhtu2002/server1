import express from "express"
const router = express.Router()
import {protect} from "../Middleware/AuthMiddleware.js"
import {createAddFunds,getAddFundsAll,getByUser} from "../controller/AdsFundsController.js"
router.post('/',protect,createAddFunds)
router.get('/',protect,getAddFundsAll)
router.get('/getByUser',protect,getByUser)
export default router