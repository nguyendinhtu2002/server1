import express from "express"
const router = express.Router()
import {addProduct, getALL,getProductById,getUpView} from "../controller/productController.js"
import { protect } from "../Middleware/AuthMiddleware.js"



router.get("/",getALL)
router.get("/:service",getProductById)
router.post('/',addProduct)
router.post('/upview',getUpView)
// router.post("/login",Login)


export default router