const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.post('/', loginController.handleLoginUser)
module.exports = router
