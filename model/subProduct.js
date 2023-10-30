const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubProductSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      maxlength: 50,
    },
    subProductId: {
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
  { collection: 'subproducts' }
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

const SubProduct = mongoose.model('Subproducts', SubProductSchema)

module.exports = { SubProduct }
