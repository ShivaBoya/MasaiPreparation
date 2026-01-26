const mongoose = require("mongoose")

module.exports = mongoose.model("Ticket", new mongoose.Schema({
 title: String,
 description: String,
 priority: String,
 status: String,
 patientId: mongoose.ObjectId,
 assignedDoctorId: mongoose.ObjectId,
 createdAt: { type: Date, default: Date.now },
 closedAt: Date
}))
