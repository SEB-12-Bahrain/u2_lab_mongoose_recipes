const Review = require("../models/Review")

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user")

    res.render("home", {
      reviews,
      user: req.session.user
    })

  } catch (error) {
    console.log(error)
    res.send("Error loading reviews")
  }
}


const showNewReviewPage = (req, res) => {

  if (!req.session.user) {
    return res.redirect("/auth/sign-in")
  }

  res.render("new-review", {
    user: req.session.user
  })
}


const createReview = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.redirect("/auth/sign-in")
    }

    await Review.create({
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating,
      user: req.session.user._id
    })

    res.redirect("/")

  } catch (error) {
    console.log(error)
    res.send("Error creating review")
  }
}


module.exports = {
  getAllReviews,
  showNewReviewPage,
  createReview
}
