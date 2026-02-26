/*Handling errors and managing sessions are key tasks for the middleware */
//this middleware works even when the server is down.
//It checks user login status and passes user info to views.
//also can be used to check errors provide feedback or redirects.

const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null
  next()
}

module.exports = {
  passUserToView,
}
