const express = require("express")
const router = express.Router()

const recipeController = require("../controllers/recipeController.js")

const Recipe = require("../models/Recipe.js")

router.post("/", recipeController.createRecipe)

router.get("/", recipeController.getAllRecipes)

router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs")
})
//////////
router.get("/", recipeController.getRecipeById)

router.put("/id", recipeController.updateRecipeById)

router.delete("/:id", recipeController.deleteRecipeById)

router.get("/:id/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render("./recipes/edit.ejs", { recipe })
})

module.exports = router
