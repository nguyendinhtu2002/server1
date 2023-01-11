const express  = require( "express")
const router = express.Router()
const {createReport,getAllReport,getByIDUser,getByID,updateReport}  = require( "../controller/reportController.js")
const {protect}  = require( "../Middleware/AuthMiddleware.js")

router.post('/',protect,createReport)
router.get('/',getAllReport)
router.get('/getByUser',protect,getByIDUser)
router.get('/:_id',protect,getByID)
router.put('/:_id',protect,updateReport)
module.exports  = router