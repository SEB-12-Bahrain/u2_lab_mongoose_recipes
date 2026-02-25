const express = require("express")

const router = express.Router()

const authController = require("../controllers/authController.js")
const userController = require("../controllers/userController")
const recipeController = require("../controllers/recipeController")

router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signInUser)
router.get("/sign-out", authController.signOutUser)
router.put("/:id", authController.updatePassword)

module.exports = router
