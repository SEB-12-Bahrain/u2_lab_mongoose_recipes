const bcrypt = require("bcrypt")
const User = require("../models/User.js")

const registerUser = async (req, res) => {
  try {
    const userInDatabase = await User.exists({ email: req.body.email })
    if (userInDatabase) {
      return res.send("username already taken")
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    await User.create({
      email: req.body.email,
      password: hashedPassword,
      first: req.body.first,
      last: req.body.last,
      picture: req.body.picture,
    })

    res.render("./auth/thanks.ejs")
  } catch (error) {
    console.error("an error has occurred registering a user", error.message)
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.send("no user has been registered with that email. Ple")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.send("incorrect password! Please try again ")
    }
    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    req.session.save(() => {
      /* res.send(`thank for signing in, ${user.first}`) */
      res.redirect(`/users/${user._id}`)
    })
  } catch (error) {
    console.error("an error has occurred sighing in a user", error.message)
  }
}

const signOutUser = (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/")
    })
  } catch (error) {
    console.error("an error has occurred signing out  a user", error.message)
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.send("no user with that id exists")
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match")
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    user.password = hashedPassword
    await user.save()
    /* res.send(`your password has been updated, ${user.first}`) */
    res.render("./auth/confirm.ejs")
  } catch (error) {
    console.error("an error has occurred updating a user's password")
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword,
}
