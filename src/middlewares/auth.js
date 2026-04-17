 const jwt = require("jsonwebtoken");
 const User = require("../models/user");
 
 const userAuth = async(req,res,next) => {
 try {

    const { token } = req.cookies;
    // validate my token
     if (!token) {
        throw new Error("Invalid token");
     }
    const decodeObj = await jwt.verify(token, "DEV@ahoo123");
    const { _id } = decodeObj;

   const user = await User.findById(_id);
   if(!user) {
    throw new Error("user does not exist");
   }

  // res.send(user);
    req.user = user; 
   
    next();
}catch (err) {
        res.status(400).send("Error :" + err.message);
    }};

    module.exports = {
        userAuth
    }