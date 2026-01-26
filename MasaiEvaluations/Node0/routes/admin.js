const router = require("express").Router()
const auth = require("../middlewares/auth")
const role = require("../middlewares/role")
const User = require("../models/User")
const Appointment = require("../models/Appointment")
const Ticket = require("../models/Ticket")

router.get("/users", auth, role("admin"), async(req,res)=>{
 res.json(await User.find({isActive:true}))
})

router.get("/stats", auth, role("admin"), async(req,res)=>{
 const doctors = await User.aggregate([
  {$match:{role:"doctor"}},
  {$lookup:{from:"appointments",localField:"_id",foreignField:"doctorId",as:"apps"}},
  {$project:{name:1,count:{$size:"$apps"}}}
 ])

 const tickets = await Ticket.aggregate([
  {$group:{_id:"$priority",count:{$sum:1}}}
 ])

 const monthly = await Appointment.aggregate([
  {$group:{_id:{$month:"$appointmentDate"},count:{$sum:1}}}
 ])

 res.json({doctors,tickets,monthly})
})

module.exports = router
