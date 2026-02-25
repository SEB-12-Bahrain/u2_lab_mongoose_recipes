const User = require("../models/User.js")
const Recipe = require("../models/Recipe.js")
const { get } = require("mongoose")

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.send(recipe)
  } catch (error) {
    console.error("Error in creating recipe ", error.message)
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.send(recipes)
  } catch (error) {
    console.error("Error in getting all recipes ", error.message)
  }
}

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.send(recipe)
  } catch (error) {
    console.error("Error in getting the recipe ", error.message)
  }
}

const updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
    res.send(recipe)
  } catch (error) {
    console.error("Error in updating the recipe ", error.message)
  }
}

const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.send(`Recipe with id ${req.params.id} deleted`)
  } catch (error) {
    console.error("Error in deleting the recipe ", error.message)
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
}
