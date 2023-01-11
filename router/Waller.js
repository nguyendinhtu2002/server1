const express = require("express")
const router = express.Router()
const { validateUserWallet, updateWaller, getMoneyByIdUser, getAll, deleteWallet } = require("../controller/WallerController.js")
const { protect } = require("../Middleware/AuthMiddleware.js")


router.post('/:user', validateUserWallet)
router.put('/:user', updateWaller)
router.get('/:user/balance', protect, getMoneyByIdUser)
router.get('/balance', getAll)
router.delete("/:_id", protect, deleteWallet)
module.exports = router