require("dotenv").config()
const express = require("express")
const rate = require("./middlewares/rate")
const logger = require("./utils/logger")
const error = require("./middlewares/error")
const connectDB = require("./config/db")

const app = express()
app.use(express.json())
app.use(logger)
app.use(rate)

connectDB()

app.use("/api/auth", require("./routes/auth"))
app.use("/api/patient", require("./routes/patient"))
app.use("/api/doctor", require("./routes/doctor"))
app.use("/api/admin", require("./routes/admin"))

app.use(error)
app.listen(process.env.PORT)
