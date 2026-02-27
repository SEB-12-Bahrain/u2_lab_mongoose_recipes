const bcrypt = require("bcrypt")

const User = require("../models/User.js")

const registerUser = async (req, res) => {
  try {
    const userInDatabase = await User.exists({ email: req.body.email })
    if (userInDatabase) {
      return res.send("Username already taken!")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password does not match")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    req.body.password = hashedPassword
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      first: req.body.first,
      last: req.body.last,
      picture: req.body.picture,
    })
    res.render("./auth/thanks.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.send(
        "No user has been registered with this email please sign-up"
      )
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.send("incorrect password!")
    }
    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    req.session.save(() => {
      res.redirect(`/users/${user._id}`)
    })
  } catch (error) {
    console.error("An error has occurred signing in a user", error.message)
  }
}

const signOutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/")
    })
  } catch (error) {
    console.error("an error has occurred signing out user", error.message)
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send("no user with that id exists!")
    }
    if (!req.body.oldPassword || !req.body.newPassword) {
      return res.status(400).send("Both old and new passwords are required")
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )
    if (!validPassword) {
      return res.status(401).send("your old password is incorrect try again!")
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).send("password and confirm must match")
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    user.password = hashedPassword
    await user.save()
    res.render("./auth/confirm.ejs")
  } catch (error) {
    console.error(
      "An error occurred trying to update the password:",
      error.message
    )
    res.status(500).send("Internal Server Error")
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword,
}
