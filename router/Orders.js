import express from "express"
const router = express.Router()
import {createOrder,getByUser,getById,updateOrder, deleteOrderById,getALLOrder,updateStatus,findByStatus} from "../controller/orderController.js"
import {admin,protect} from "../Middleware/AuthMiddleware.js"

router.post("/",protect,createOrder)
router.get("/:_id/getByUser",protect,getByUser)
router.get("/:_id",protect,getById)
router.put("/:_id",protect,updateOrder)
router.put("/:_id/status",updateStatus)
router.delete("/:_id",protect,deleteOrderById)
router.post("/findByStatus",protect,findByStatus)
router.get('/',getALLOrder)
export default router