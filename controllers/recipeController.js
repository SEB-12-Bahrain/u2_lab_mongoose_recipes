const User = require("../models/User.js")
const Recipe = require("../models/Recipe.js")

const createRecipe = async (req, res) => {
  try {
    const Recipe = await Recipe.create(req.body)
    /* res.send(recipe) */
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("an error has occurred creating a recipe!", error.message)
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.send(recipes)
  } catch (error) {
    console.error("an error has occurred getting all recipes!", error.message)
  }
}
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    /*  res.send(recipe) */

    res.render("./recipes/all.ejs", { recipes })
  } catch (error) {
    console.error("an error has occurred getting a recipe", error.message)
  }
}

const updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
    res.send(recipe)
  } catch (error) {
    console.error("an error has occurred updating a recipe", error.massage)
  }
}
const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.send(`recipe with ID ${req.params.id} has been deleted successfully`)
  } catch (error) {
    console.log("an error has occurred deleting a recipe!", error.message)
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
}
