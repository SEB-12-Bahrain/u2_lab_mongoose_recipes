const passUserToView = (req, res, next) => {
  res.locals = req.session.user ? req.session.user : null
  next()
}

module.exports = {
  passUserToView,
}
