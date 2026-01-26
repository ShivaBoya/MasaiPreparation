const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
 const t = req.headers.authorization
 if(!t) return res.sendStatus(401)
 req.user = jwt.verify(t, process.env.JWT)
 next()
}
