const router = require("express").Router()
const auth = require("../middlewares/auth")
const role = require("../middlewares/role")
const Appointment = require("../models/Appointment")
const Ticket = require("../models/Ticket")
const User = require("../models/User")
const mongoose = require("mongoose")

router.post("/appointment", auth, role("patient"), async(req,res)=>{
 const session = await mongoose.startSession()
 await session.withTransaction(async()=>{
  const clash = await Appointment.findOne({doctorId:req.body.doctorId,appointmentDate:req.body.appointmentDate})
  if(clash) throw "Slot taken"
  const ap = await Appointment.create([{...req.body,patientId:req.user.id,status:"booked"}],{session})
  res.json(ap)
 })
})

router.get("/appointments", auth, role("patient"), async(req,res)=>{
 res.json(await Appointment.find({patientId:req.user.id}))
})

router.post("/ticket", auth, role("patient"), async(req,res)=>{
 res.json(await Ticket.create({...req.body,patientId:req.user.id,status:"open"}))
})

module.exports = router
