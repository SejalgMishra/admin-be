const jwt = require("jsonwebtoken")

const auth = (req , res , next) => {
    try {
        const { token }  = req.cookies
        if(!token){
         res.send("Please First logged in")
        }
        const decode = jwt.verify(token , 'shhh')
        req.user = decode
        console.log(decode);
     } catch (error) {
         
     }
     return next()

}

module.exports = auth