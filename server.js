const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

require("dotenv").config()

const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const path = require("path")
const middleware = require("./middleware")
const db = require("./db")

const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const reviewRouter = require("./routes/reviewRouter")

const app = express()
const PORT = 3000

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

app.use(
  session({
    secret: "supersecret123",
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

app.use(middleware.passUserToView)

app.use("/reviews", reviewRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)

app.get("/", function (req, res) {
  res.render("home", {
    user: req.session.user
  })
})
app.use(express.urlencoded({ extended: true }))


app.get("/welcome", function (req, res) {
  if (!req.session.user) {
    return res.redirect("/auth/sign-in")
  }

  res.render("welcome", {
    user: req.session.user
  })
})


app.listen(PORT, () => {
  console.log(`✨ Server is listening on port ${PORT}...`)
})
