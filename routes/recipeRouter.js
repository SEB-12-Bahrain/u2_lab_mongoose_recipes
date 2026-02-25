const express = require("express")
const router = express.Router()
const Recipe = require("../models/Recipe.js")
const recipeController = require("../controllers/recipeController")

router.post("/", recipeController.createRecipe)
router.get("/", recipeController.getAllRecipes)
router.get("/:id", recipeController.getRecipeById)
router.put("/:id", recipeController.updateRecipeById)
router.delete("/:id", recipeController.deleteRecipeById)
router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs")
})
router.get("/:id/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render("./recipes/edit.ejs", { recipe })
})
module.exports = router
