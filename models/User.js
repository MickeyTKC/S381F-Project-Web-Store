const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "operator", "admin"], required: true },
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)