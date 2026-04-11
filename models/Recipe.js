const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)
