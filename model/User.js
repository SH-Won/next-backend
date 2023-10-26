const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minglength: 5,
    },
    role: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
  },
  { collection: 'users' }
)

module.exports = mongoose.model('User', userSchema)
