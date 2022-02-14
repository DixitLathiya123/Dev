const mongoose = require('mongoose');
const validator = require("validator");

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        maxlength: [20, "Maxmimum 20 character"],
        required: [true, "Please enter the first name"],
      },
      last_name: {
        type: String,
        maxlength: [20, "Maxmimum 20 character"],
        required: [true, "Please enter the last name"],
      },
      email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"],
      },
      password: {
        type: String,
        required: [true, "Please enter the password"]
      },
    isActive: { type: Boolean, default: true }

}, { timestamps: true, });

module.exports = mongoose.model("user", UserSchema)