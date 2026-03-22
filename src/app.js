const express = require("express");

const app = express();

app.use("/test",(req, res) => {
    res.send("Hello from the server111");
})

app.use("/namaste", (req,res) => {
    res.send("namaste nodejs");
})




app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
    
})