const express = require("express");
const {auth}= require("./middlewares/auth")
const app = express();

app.get("/user", (req, res) => {
    res.send({firstname: "Aman", lastname: "virdi"});
})

app.post("/user", (req, res) => {
    res.send("data saved succesfully in database");
})

app.delete("/user", (req, res) => {
    res.send("data deleted successfully");
})

app.use("/test",(req, res) => {
    res.send("Hello from the server");
})

app.use("/namaste", (req,res) => {
    res.send("namaste nodejs");
})

app.use("/dashboard", auth);

app.get("/dashboard", auth, (req,res) =>{
    res.send("welcome");
});

app.get("/dashboard/getAllData", auth, (req,res) =>{
    res.send("All data sent");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
    
})