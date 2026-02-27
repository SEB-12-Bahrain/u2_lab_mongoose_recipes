const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/profile", userController.showProfilePage)
router.put("/profile/address", userController.updateAddress)

module.exports = router
