const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


const authRouter = express.Router();

authRouter.post("/signup", async(req,res) => {
  try{
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId,  password, skills } = req.body;
    //Encrypt the password
   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash);

 const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
    skills,
 });
       await user.save();
    res.send("user added successfully");
}
catch(err){
    res.status(400).send("ERROR : " + err.message);
}
});

authRouter.post("/login", async (req,res) =>{
    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("invalid");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {
       // create a jwt token

       const token = await user.getJwt();
      

       //add the token to cookie and send the response back to the user

            res.cookie("token", token);
            res.send("Login successfully");
        } else {
            throw new Error("Invalid");
        }
    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout successfully");
});

// authRouter.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.send("Logout successful"); 
// });


module.exports = 
    authRouter ;