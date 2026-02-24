const bcrypt = require('bcrypt')
const User = require('../models/User')

const registerUser = async (req, res) => {
  try {
    const exists = await User.exists({ email: req.body.email })
    if (exists) return res.send('User already exists!')

    if (req.body.password !== req.body.confirmPassword)
      return res.send('Password and confirm password must match!')

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    req.body.password = hashedPassword

    await User.create(req.body)
    res.send('Thank you for signing up.')
  } catch (error) {
    console.log(`An error has occurred while signing up: ${error.message}`)
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send('User does not exist. Please sign up.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.send('Password is incorrect.')

    req.session.user = {
      email: user.email,
      _id: user._id
    }

    req.session.save(() => {
      res.send(`Thank you for signing in, ${user.first}`)
    })
  } catch (error) {
    console.log(`An error has occurred while signing in: ${error.message}`)
  }
}

const signOutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    })
  } catch (error) {
    console.log(`An error has occurred while singing out: ${error.message}`)
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser
}
