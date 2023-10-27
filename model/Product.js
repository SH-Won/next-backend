const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      maxlength: 50,
    },
    label: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    category: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: 'products' }
)

// postSchema.index({
//     title:'text',
//     description:'text',
// },{
//     weights:{
//         title:5,
//         description:1,
//     }

// })

const Product = mongoose.model('Products', ProductSchema)

module.exports = { Product }
