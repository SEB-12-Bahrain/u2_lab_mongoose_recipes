require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const { MongoStore } = require("connect-mongo")
const path = require("path")

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

const db = require("./db")
const middleware = require("./middleware")
app.use(middleware.passUserToView)

const authRouter = require("./routes/authRouter.js")
const recipeRouter = require("./routes/recipeRouter.js")
const userRouter = require("./routes/userRouter.js")

app.use("/recipes", recipeRouter)
app.use("/auth", authRouter)
app.use("/users", userRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(PORT, () => {
  console.log(`🥘 Mongoose Recipes Server is cooking on Port ${PORT} . . . `)
})
