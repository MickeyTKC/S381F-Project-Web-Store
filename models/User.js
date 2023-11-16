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

//------------------Function start------------------

userSchema.statics.findByIdE = function (userId, email){  //find by userId, email
  return this.find({userId: userId, email: email});
}

userSchema.statics.findByIdP = function (userId, password){  //find by userId, password
  return this.find({userId: userId, password: password});
}

userSchema.statics.findByEP = function (email, password){  //find by email, password
  return this.find({email: email, password: password});
}

userSchema.statics.findByNAP = function (name, address, phoneNo){ //finc by name, address, phoneNo
  return this.find({name: name, address: address, phoneNo: phoneNo});
}


module.exports = mongoose.model("User",userSchema)