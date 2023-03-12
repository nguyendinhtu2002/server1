const express = require("express")
const { createUrl, getUrl, getbyId, getUrlById, updateStatus, deleteUrl } = require("../controller/UrlController")
const { protect } = require("../middlerware/AuthMiddleware")
const { chanbot } = require("../middlerware/chanbot")
const router = express.Router()


router.post('/',createUrl)
router.get('/:shortURL',getUrl)
router.get("/:user/getALL",protect,getbyId)
router.get("/:id/getById",getUrlById)
router.put("/:id",updateStatus)
router.delete('/:id',deleteUrl)
module.exports = router