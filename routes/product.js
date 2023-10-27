const express = require('express')
const router = express.Router()
const { Product } = require('../model/Product')

router.get('/', (req, res) => {
  // const productId =  req.query.productId
  const clientId = req.query.clientId
  console.log('/main', clientId)
  if (clientId) {
    ClientProduct.find({ clientId: ObjectId(req.query.clientId) }).exec((err, products) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, products })
    })
  } else {
    Product.find({}).exec((err, products) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, products })
    })
  }
})

module.exports = router
