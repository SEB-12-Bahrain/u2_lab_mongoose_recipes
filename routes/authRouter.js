const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const authController = require("../controllers/authController.js")

router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signInUser)
router.get("/sign-out", middleware.isSignIn, authController.signOutUser)
router.put("/:id", middleware.isSignIn, authController.updatePassword)

router.get("/sign-up", (req, res) => {
  res.render("./auth/sign-up.ejs")
})
router.get("/sign-in", (req, res) => {
  res.render("./auth/sign-in.ejs")
})
router.get("/:id/update-password", middleware.isSignIn, (req, res) => {
  res.render("./auth/update-password.ejs")
})
module.exports = router
