const mongoose = require("mongoose")

const medicalSchema = new mongoose.Schema({
 appointmentId: mongoose.ObjectId,
 diagnosis: String,
 notes: String,
 date: Date
})

module.exports = mongoose.model("User", new mongoose.Schema({
 name: String,
 email: { type: String, unique: true },
 password: String,
 role: String,
 specialization: String,
 isActive: { type: Boolean, default: true },
 medicalHistory: [medicalSchema],
 createdAt: { type: Date, default: Date.now }
}))
