const express = require('express')
const router = express.Router()
const authController = require('../middleware/verifyJWT')

router.get('/', authController, (req, res) => {
  res.json({ success: true })
})
module.exports = router
