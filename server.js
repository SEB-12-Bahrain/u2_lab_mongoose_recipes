require("dotenv").config({ quiet: true })
const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

const { MongoStore } = require("connect-mongo")

const path = require("path")

// middleware
const middleware = require("./middleware")

// express library
const app = express()

//Router
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const recipeRouter = require("./routes/recipeRouter.js")

const db = require("./db")

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
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

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/recipes", recipeRouter)
app.use(middleware.passUserToView)

app.get("/", (req, res) => {
  res.render("./index.ejs")
})

app.listen(PORT, () => {
  console.log(`🥘 Mongoose Recipes Server is cooking on Port ${PORT} . . . `)
})
