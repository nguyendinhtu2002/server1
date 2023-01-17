const express = require("express")
const router = express.Router()
const { protect } = require("../Middleware/AuthMiddleware.js")
const {createVoucher,updateVoucher} = require("../controller/VoucherController")




router.post('/', createVoucher)
router.post('/edit',protect, updateVoucher)

// router.post("/login",Login)


module.exports = router