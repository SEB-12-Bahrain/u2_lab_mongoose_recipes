const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")

router.get("/", reviewController.getAllReviews)

router.get("/new", reviewController.showNewReviewPage)

router.post("/", reviewController.createReview)

module.exports = router
