const bcrypt = require("bcrypt")

const User = require("../models/User")

const registerUser = async (req, res) => {
  try {
    const userInDatabase = await User.exists({
      email: req.body.email,
    })
    if (userInDatabase) {
      return res.send("❌ Username is already taken!")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("❌ password and confirm password must match")
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
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}
const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    if (!user) {
      return res.send(
        "❌ no user has been register with that email. please sign up"
      )
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.send("❌ incorrect password! try again")
    }
    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    req.session.save(() => {
      res.redirect(`/user/${user._id}`)
    })
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}
const signOutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/")
    })
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.send("❌ No user with that ID exist")
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )
    if (!validPassword) {
      return res.send("❌ Your old password not correct")
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("❌ password not same")
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    user.password = hashedPassword
    await user.save()

    // res.send("✅ Your password Updated successfully")
    res.render("./auth/confirm.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword,
}
