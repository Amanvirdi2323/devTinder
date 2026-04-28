const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
//const { validateEditProfileData } = require("./utils/validation");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use("/auth", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);








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




