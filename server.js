const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const path = require("path")
const db = require("./db")
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter.js")
const recipeRouter = require("./routes/recipeRouter")

const app = express()

app.use(morgan("dev"))
app.use(methodOverride("_method")) //_method same as what we call it in the form

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

/*
express.static sends the CSS file so the login page looks pretty.
express.

urlencoded captures the username and password when the user clicks "Submit."
 */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/auth", authRouter)
app.use('/users', userRouter)
app.use("/recipes", recipeRouter)

//base rout
app.get("/", (req, res) => {
  res.send("🧑‍🍳 Mongoose Recipes is waiting for orders . . . ")
})

const PORT = process.env.PORT ? process.env.PORT : 3000

app.listen(PORT, () => {
  console.log(`🥘 Mongoose Recipes Server is cooking on Port ${PORT} . . . `)
})
