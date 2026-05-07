const express = require("express")
const router = express.Router()
const middleware = require("../middleware")

const Recipe = require("../models/Recipe.js")
const recipeController = require("../controllers/recipeController.js")

router.post("/", middleware.isSignIn, recipeController.createRecipe)
router.get("/", recipeController.getAllRecipes)
router.get("/new", middleware.isSignIn, (req, res) => {
  res.render("./recipes/new.ejs")
})

router.get("/:id", recipeController.getRecipeById)
router.put("/:id", middleware.isSignIn, recipeController.updateRecipeById)
router.delete("/:id", middleware.isSignIn, recipeController.deleteRecipeById)

router.get("/:id/edit", middleware.isSignIn, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render("./recipes/edit.ejs", { recipe })
})
module.exports = router
