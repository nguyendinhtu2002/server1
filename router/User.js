// const express = require("express")
// const router = express.Router()

import express from "express"
const router = express.Router()
import { register, Login, updateProfile,updateMoney,getUserById,deleteUserById,updateUser,LoginAdmin,getAllUsers, getApiKey, ChangeApiKey, forgotPassword, updateEmail } from "../controller/userController.js"
import { admin,protect } from "../Middleware/AuthMiddleware.js"
// import limitter from "express-rate-limit"
// const loginLimitter =limitter ({
//     windowMs: 5*6*1000,
//     max: 5,
//     message: {
//       code:429,
//       message:'Toomany request'
//     }
//   })

router.post("/signup", register)
router.post("/login", Login)
router.post("/forgotPassword",forgotPassword)
router.put("/:_id/updateProfile",protect, updateProfile)
router.put("/:_id/updateEmail",protect, updateEmail)
router.get("/:_id",protect, getUserById)
router.get("/:_id/apiKey",protect,getApiKey)
router.put("/:_id/apiKey",protect,ChangeApiKey)
router.put("/money",protect,updateMoney)
router.get("/",protect,admin,getAllUsers)
router.delete("/:_id",protect,deleteUserById)
router.put("/:id",protect,updateUser)
router.post("/loginAdm",LoginAdmin)

export default router