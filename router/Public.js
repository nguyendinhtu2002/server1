import express from "express"
const router = express.Router()

import apiPublic from "../public/publicController.js"

router.post('/',apiPublic)

export default router