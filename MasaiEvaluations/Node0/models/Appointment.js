const mongoose = require("mongoose")

module.exports = mongoose.model("Appointment", new mongoose.Schema({
 patientId: { type: mongoose.ObjectId, ref: "User" },
 doctorId: { type: mongoose.ObjectId, ref: "User" },
 appointmentDate: Date,
 status: String,
 symptoms: String,
 prescription: String,
 createdAt: { type: Date, default: Date.now }
}))
