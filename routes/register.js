const express = require('express')
const router = express.Router()
const authController = require('../controller/registerController')

router.post('/', authController.handleRegisterUser)
module.exports = router
