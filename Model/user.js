const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Mobile: String,
  Address: String,
  City: String,
  State: String,
  Zip: Number,
  Password: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
