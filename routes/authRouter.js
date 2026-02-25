const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/sign-up', (req, res) => {
  res.render('./auth/sign-up.ejs') // this will show the form
})
router.post('/sign-up', authController.registerUser) // this will handle form submission

router.get('/sign-in', (req, res) => {
  res.render('./auth/sign-in.ejs')
})
router.post('/sign-in', authController.signInUser)

router.get('/sign-out', authController.signOutUser)

router.get('/:id/update-password', (req, res) => {
  res.render('./auth/update-password.ejs')
})
router.put('/:id', authController.updatePassword)

module.exports = router
