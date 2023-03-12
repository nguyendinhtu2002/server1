// const express = require("express")
// const router = express.Router()
const rateLimit = require('express-rate-limit')
const express = require("express")
const router = express.Router()
const { register, Login, updateProfile, updateMoney, getUserById, deleteUserById, updateUser, LoginAdmin, getAllUsers, getApiKey, ChangeApiKey, forgotPassword, updateEmail } = require("../controller/userController.js")
const { admin, protect } = require("../Middleware/AuthMiddleware.js")
const createAccountLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 1 hour
	max: 3, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.post("/signup",createAccountLimiter, register)
router.post("/login", Login)
router.post("/forgotPassword", forgotPassword)
router.put("/:_id/updateProfile", protect, updateProfile)
router.put("/:_id/updateEmail", protect, updateEmail)
router.get("/:_id", protect, getUserById)
router.get("/:_id/apiKey", protect, getApiKey)
router.put("/:_id/apiKey", protect, ChangeApiKey)
router.put("/money", protect, updateMoney)
router.get("/", protect, admin, getAllUsers)
router.delete("/:_id", protect, deleteUserById)
router.put("/:id", protect, updateUser)
router.post("/loginAdm", LoginAdmin)

module.exports = router