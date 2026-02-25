const User = require('../models/User')
const Recipe = require('../models/Recipe')

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const recipes = await Recipe.find({ author: user._id })

    const data = {
      _id: user._id,
      first: user.first,
      last: user.last,
      picture: user.picture,
      recipes: recipes
    }

    res.render('./users/profile.ejs', { user: data })
  } catch (error) {
    console.log(`An error has occurred while fetching user: ${error.message}`)
  }
}

module.exports = {
  getUserById
}
