const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")

const router = express.Router()

// show sign up
router.get("/sign-up", function (req, res) {
  res.render("auth/sign-up")
})

// register
router.post("/sign-up", async function (req, res) {
  try {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if (password !== confirmPassword) {
      return res.send("Passwords do not match")
    }

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.send("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
      profilePic: req.body.profilePic,
      password: hashedPassword
    })

    res.redirect("/auth/sign-in")
  } catch (err) {
    res.send("Error creating user")
  }
})

// show sign in
router.get("/sign-in", function (req, res) {
  res.render("auth/sign-in")
})

// sign in
router.post("/sign-in", async function (req, res) {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.send("User not found")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.send("Wrong password")
    }

    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      email: user.email
    }

    res.redirect("/welcome")
  } catch (err) {
    res.send("Login error")
  }
})

// logout
router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
})

module.exports = router
