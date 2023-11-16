const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "operator", "admin"], required: true },
  name: { type: String, required: true },
  info: { type: String },
  address: { type: String },
  email: {type: String},
  phoneNo: {type:String}
});

module.exports = mongoose.model("User",userSchema)