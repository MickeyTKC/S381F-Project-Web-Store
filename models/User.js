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
  return this.find({name: {$regex: name}}).sort({name:1});
}

userSchema.statics.findByEmail = function (email){  //find by email
  return this.find({email: {$regex: email}});
}

userSchema.statics.findByPhone = function (phoneNo){ //find by phoneNo
  return this.find({phoneNo: phoneNo});
}

userSchema.statics.findByAddress = function (address){ //find by address
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

// userSchema.query.filter = function(User){ //testing
//   return this.find();
// }


module.exports = mongoose.model("User",userSchema)