const User = require("../models/User")
const Recipes = require("../models/Recipe")

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const recipes = await Recipes.find({ author: user._id })
    const data = {
      _id: user._id,
      first: user.first,
      last: user.last,
      picture: user.picture,
      recipes: recipes,
    }
    // res.send(data)
    res.render("./users/profile.ejs", { user: data })
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}

module.exports = {
  getUserById,
}
