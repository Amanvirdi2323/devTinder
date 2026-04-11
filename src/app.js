const express = require("express");
//const {auth}= require("./middlewares/auth")
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.get("/user", async(req,res) =>{
    const userEmail = req.body.emailId;

try{
    const user = await User.find({emailId:userEmail});

if(user.length ===0) {
    res.status(404).send("User not found");
} else{
res.send(user);
}
}
catch(err) {
    res.status(400).send("something went wrong")
}
});

app.get("/user/:id", async(req,res) =>{
    const userId = req.params.id;

try{
    const user = await User.findById(userId);
    console.log(user);

if(!user) {
    res.status(404).send("User not found");
} else{
res.send(user);
}
}
catch(err) {
    res.status(400).send("Invalid ID")
}
});




app.get("/feed", async (req,res) =>{
   
try{
    const users = await User.find({});
    res.send(users);
}
catch(err) {
    res.status(400).send("something went wrong")
}
});

app.delete("/user", async (req,res) => {
    const userId = req.body.userId;

    try{
constuser = await User.findByIdAndDelete(userId);
res.send("User deleted successfully");
    }
    catch(err)
{
    res.status(400).send("something went wrong");
}
});

app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);

    try{
        await User.findByIdAndUpdate({_id: userId}, data);
        res.send("User updated successfully");
    }
    catch(err) {
        res.status(400).send("something went wrong");
    }
});








app.post("/signup", async(req,res) => {
    const user = new User(req.body);
     
    
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




