const router = require("express").Router()
const auth = require("../middlewares/auth")
const role = require("../middlewares/role")
const Appointment = require("../models/Appointment")
const Ticket = require("../models/Ticket")

router.get("/appointments", auth, role("doctor"), async(req,res)=>{
 res.json(await Appointment.find({doctorId:req.user.id}))
})

router.put("/appointment/:id", auth, role("doctor"), async(req,res)=>{
 res.json(await Appointment.findByIdAndUpdate(req.params.id,{prescription:req.body.prescription,status:"completed"}))
})

router.get("/tickets", auth, role("doctor"), async(req,res)=>{
 res.json(await Ticket.find({assignedDoctorId:req.user.id}))
})

router.put("/ticket/:id", auth, role("doctor"), async(req,res)=>{
 const t = await Ticket.findById(req.params.id)
 if(t.status==="resolved") return res.sendStatus(400)
 t.status="resolved"
 t.closedAt=new Date()
 await t.save()
 res.json(t)
})

module.exports = router
