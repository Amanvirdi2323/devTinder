const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
   emailId: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
    validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error("Invalid email");
    }
  }
},
    password: {
        type: String,
           required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
}, {
    timestamps: true
})
module.exports = mongoose.model("User", userSchema);