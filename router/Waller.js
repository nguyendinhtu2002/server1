import express from "express"
const router = express.Router()
import {validateUserWallet,updateWaller,getMoneyByIdUser,getAll, deleteWallet} from "../controller/WallerController.js"
import {protect} from "../Middleware/AuthMiddleware.js"


router.post('/:user',validateUserWallet)
router.put('/:user',updateWaller)
router.get('/:user/balance',protect,getMoneyByIdUser)
router.get('/balance',getAll)
router.delete("/:_id",protect,deleteWallet)
export default router
