const express = require("express")
const router = express.Router()
const { addProduct, getALL, getProductById, getUpView } = require("../controller/productController.js")
const { protect } = require("../Middleware/AuthMiddleware.js")



router.get("/", getALL)
router.get("/:service", getProductById)
router.post('/', addProduct)
router.post('/upview', getUpView)
// router.post("/login",Login)


module.exports = router