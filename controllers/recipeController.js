const User = require("../models/User")
const recipes = require("../models/Recipe")

const createRecipe = async (req, res) => {
  try {
    const recipe = await recipes.create(req.body)
    // res.send(recipe)
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred creating a recipe!", error.message)
  }
}
const getAllRecipes = async (req, res) => {
  try {
    const recipe = await recipes.find({})
    // res.send(recipe)
    res.render("./recipes/all.ejs", { recipe })
  } catch (error) {
    console.error(
      "⚠️ An error has occurred getting all recipes!",
      error.message
    )
  }
}

const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipes.findById(req.params.id)
  } catch (error) {
    console.error("⚠️ An error has occurred getting a recipe!", error.message)
  }
}

const updateRecioeById = async (req, res) => {
  try {
    const recipe = await recipes.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
    // res.send(recipe)
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred updating a recipe!", error.message)
  }
}
const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await recipes.findByIdAndDelete(req.params.id)
    res.render("./recipes/show.ejs", { recipe })
    // res.send(
    //   `🗑️ Recipe with ID ${req.params.id} has been deleted successfully!`
    // )
    res.render("./recipes/confirm.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a recipe!", error.message)
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecioeById,
  deleteRecipeById,
}
