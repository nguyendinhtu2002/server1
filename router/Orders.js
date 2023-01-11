const express =require( "express")
const router = express.Router()
const {createOrder,getByUser,getById,updateOrder, deleteOrderById,getALLOrder,updateStatus,findByStatus} =require( "../controller/orderController.js")
const {admin,protect} =require( "../Middleware/AuthMiddleware.js")

router.post("/",protect,createOrder)
router.get("/:_id/getByUser",protect,getByUser)
router.get("/:_id",protect,getById)
router.put("/:_id",protect,updateOrder)
router.put("/:_id/status",updateStatus)
router.delete("/:_id",protect,deleteOrderById)
router.post("/findByStatus",findByStatus)
router.get('/',getALLOrder)

module.exports  = router