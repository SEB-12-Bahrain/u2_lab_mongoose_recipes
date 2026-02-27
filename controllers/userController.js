const User = require("../models/User")

const showProfilePage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/sign-in")
    }
    const user = await User.findOne({ username: req.session.user.username })
    res.render("./users/profile.ejs", { user: user })
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error showing Profile Page!", error: error.message })
  }
}

const updateAddress = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/sign-in")
    }
    await User.findOneAndUpdate(
      { username: req.session.user.username },
      {
        address: {
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip
        }
      },
      { returnDocument: "after" }
    )
    res.redirect("/users/profile")
  } catch (error) {
    res.status(500).json({ message: "⚠️ Error updating address!", error: error.message })
  }
}

module.exports = {
  showProfilePage,
  updateAddress
}
