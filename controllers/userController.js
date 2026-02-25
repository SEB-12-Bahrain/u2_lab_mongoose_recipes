const User = require("../models/User")
const Recipe = require("../models/Recipe.js")

const getAllUSers = async (req, res) => {
  try {
    const user = await User.find({})
    res.send(user)
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("recipes")
    const recipes = await Recipe.find({ author: user._id })
    const data = {
      _id: user._id,
      first: user.first,
      last: user.last,
      picture: user.picture,
      recipes: recipes,
    }
    res.render("./users/profile.ejs", { user })
  } catch (error) {
    console.error("⚠️ An error has occurred finding a user!", error.message)
  }
}

module.exports = {
  getUserById,
  getAllUSers,
}
