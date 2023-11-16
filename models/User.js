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

userSchema.statics.findByUserId = function (userId){  //find by userId
  return this.find({userId: userId});
}

userSchema.statics.findByName = function (name){  //find by name
  return this.find({name: {$regex: name}});
}

userSchema.statics.findByEmail = function (email){  //find by email
  return this.find({email: {$regex: email}});
}

userSchema.statics.findByPhone = function (phoneNo){ //finc by phoneNo
  return this.find({phoneNo: phoneNo});
}

userSchema.statics.findByAddress = function (address){ //finc by address
  return this.find({address: {$regex: address}});
}


// userSchema.statics.findByIdE = function (userId, email){  //testing
//   var test;
//   if(email==null || email==""){
//     test = {userId: userId};
//     console.log("here");
//   }else{
//     test = {userId: userId, email: email}
//   }
//   return this.find(test);
// }

// userSchema.query.filter = function(userId,password,role,name,info,address,email,phoneNo){ //testing

//   return this.find({userId:userId, password:password, role:role, name:name, 
//     info: {$in:info}, address: {$in:address}, email: {$in:email}, phoneNo:phoneNo});
// }


module.exports = mongoose.model("User",userSchema)