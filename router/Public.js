const express  = require( "express")
const router = express.Router()

const apiPublic  = require( "../public/publicController.js")

router.post('/',apiPublic)

module.exports = router