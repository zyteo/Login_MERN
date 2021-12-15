const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    username: { type: String, required: true },
    password: {
      type: String,
      required: true,
      min: [6, "Password cannot be too short. Minimum 6 characters."],
    },
    role: { type: String, required: true, default: "User" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
