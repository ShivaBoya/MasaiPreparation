const mongoose = require("mongoose")

module.exports = async () => {
 try {
  await mongoose.connect(process.env.MONGO)
  console.log("MongoDB Connected")
 } catch (e) {
  console.log("DB Error")
  process.exit(1)
 }
}
