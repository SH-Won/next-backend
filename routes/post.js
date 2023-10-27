const express = require('express')
const router = express.Router()
const { Post } = require('../model/Post')

router.get('/', (req, res) => {
  let skip = req.query.skip ? parseInt(req.query.skip) : Number(0)
  let limit = req.query.limit ? parseInt(req.query.limit) : 100
  let category = req.query.category ? req.query.category : null
  let findArg = {}
  if (category) {
    findArg['category'] = category.split(',').map(Number)
  }

  Post.find(findArg)
    // .sort({ $natural: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, posts) => {
      if (err) res.json({ success: false, err })
      res.json({ posts, postSize: posts.length })
    })
})

module.exports = router
