const Recipe = require('../models/Recipe')
const User = require('../models/User')

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.send(`A new recipe has been added to your profile: ${recipe}`)
  } catch (error) {
    console.log(
      `An error has occurred while creating a recipe: ${error.message}`
    )
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    res.render('./recipes/all.ejs', { recipes })
  } catch (error) {
    console.log(
      `An error has occurred while getting all recipes: ${error.message}`
    )
  }
}

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.render('./recipes/show.ejs', { recipe })
  } catch (error) {
    console.log(
      `An error has occurred while getting the recipe: ${error.message}`
    )
  }
}

const updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after'
    })
    res.send(recipe)
  } catch (error) {
    console.log(
      `An error has occurred while updating the recipe: ${error.message}`
    )
  }
}

const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.send('The recipe has been deleted.')
  } catch (error) {
    console.log(
      `An error has occurred while deleting the recipe: ${error.message}`
    )
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById
}
