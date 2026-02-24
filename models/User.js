const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    first: {
      type: String,
      require: true
    },
    last: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    picture: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
