const express = require("express");
//const {auth}= require("./middlewares/auth")
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async(req,res) => {
    const user = new User({
        firstName: "Rohit",
        lastName: "sharma",
        emailId: "rohit123@.com",
        password: "sharma12"
    });
try{
    await user.save();
    res.send("user added successfully");
}
catch(err){
    res.status(400).send("error saving the user:" + err.message);
}
});

connectDB()
 .then ( () => {
    console.log("Database connection established");
    app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});
 })
 .catch((err) => {
     console.log("Database not connected");
 });




