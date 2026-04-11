const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  picture: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
