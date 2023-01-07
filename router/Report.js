import express from "express"
const router = express.Router()
import {createReport,getAllReport,getByIDUser,getByID,updateReport} from "../controller/reportController.js"
import {protect} from "../Middleware/AuthMiddleware.js"

router.post('/',protect,createReport)
router.get('/',getAllReport)
router.get('/getByUser',protect,getByIDUser)
router.get('/:_id',protect,getByID)
router.put('/:_id',protect,updateReport)
export default router