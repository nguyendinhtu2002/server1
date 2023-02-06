const express = require("express")
const router = express.Router()
const { addProduct, getALL, getProductById, getUpView, updateProduct, getProductByService } = require("../controller/productController.js")
const { protect } = require("../Middleware/AuthMiddleware.js")



router.get("/", getALL)
router.get("/:service", getProductByService)
router.get("/:_id/edit", getProductById)

router.post('/', addProduct)
router.post('/upview', getUpView)
router.put('/:_id',updateProduct)
// router.post("/login",Login)


module.exports = router