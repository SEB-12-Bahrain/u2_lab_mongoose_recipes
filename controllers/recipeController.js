const User = require("../models/User")
const Recipe = require("../models/Recipe")

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.send(recipe)
  } catch (error) {
    console.error("⚠️ An error has occurred creating a recipe!", error.message)
    console.log(error)
  }
}

module.exports = {
  createRecipe,
}
