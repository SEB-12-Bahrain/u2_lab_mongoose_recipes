const User = require("../models/User")
const Recipe = require("../models/Recipe")

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred creating a recipe!", error.message)
    console.log(error)
  }
}

const getAllRecipes = async (req, res) => {
  try {
    //returns an array of every document that matches the criteria. In this case, your options object
    const recipes = await Recipe.find({})

    res.render("./recipes/all.ejs", { recipes })
  } catch (error) {
    console.error(
      "⚠️ An error has occurred getting all recipes!",
      error.message
    )
  }
}

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.render("./recipes/show.ejs", { recipe })
  } catch (error) {
    console.error("⚠️ An error has occurred getting a recipe!", error.message)
  }
}

const updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    }) //req.body takes the user input make it as the new value
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred updating a recipe!", error.message)
  }
}

const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.render("./recipes/confirm.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a recipe!", error.message)
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
}
