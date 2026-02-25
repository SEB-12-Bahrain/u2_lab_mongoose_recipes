const express = require("express")
const router = express.Router()

const recipeController = require("../controllers/recipeController")
const recipe = require("../models/Recipe")

router.post("/", recipeController.createRecipe)
router.get("/", recipeController.getAllRecipes)
router.put("/:id", recipeController.updateRecioeById)
router.delete("/:id", recipeController.deleteRecipeById)
router.get("/:id", recipeController.getRecipeById)
router.get("/new", (req, res) => {
  res.render("/recipes/new.ejs")
})
router.get("/:id/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render("./recipes/edit.ejs", { recipe })
})
module.exports = router
