const express = require("express")
const router = express.Router()

const getHistoryById =  require("../controller/Signin.js")
const { protect } = require("../Middleware/AuthMiddleware.js")


router.get("/:_id/getByUser",protect,getHistoryById)


module.exports  = router