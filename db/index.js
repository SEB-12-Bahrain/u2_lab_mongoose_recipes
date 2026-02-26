const mongoose = require("mongoose")
const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    mongoose.connection.on("connected", () => {
      console.log(`successfully connected to MongoDB database ...`)
    })
  } catch (error) {
    console.log("error connecting to mongoDB ...")
    console.log(error)
  }
}
connect()
module.exports = mongoose
