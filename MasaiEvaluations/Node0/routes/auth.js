const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.post("/register", async(req,res)=>{
 const u = await User.create({...req.body, password:await bcrypt.hash(req.body.password,10)})
 res.json(u)
})

router.post("/login", async(req,res)=>{
 const u = await User.findOne({email:req.body.email,isActive:true})
 if(!u) return res.sendStatus(404)
 if(!await bcrypt.compare(req.body.password,u.password)) return res.sendStatus(401)
 res.json({token:jwt.sign({id:u._id,role:u.role},process.env.JWT)})
})

module.exports = router
