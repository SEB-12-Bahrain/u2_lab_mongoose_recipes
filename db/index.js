const mongoose = require("mongoose")

const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB")
    })
  } catch (error) {
    console.log("Error connecting to MongoDB")
  }
}

connect()
