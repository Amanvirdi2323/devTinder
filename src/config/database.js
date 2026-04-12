 const mongoose = require("mongoose");

 const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://virdi123:*******@virdinode.lj0uwsl.mongodb.net/"
       
    )
 };

 module.exports = connectDB;