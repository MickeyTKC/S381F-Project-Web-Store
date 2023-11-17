const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true},
  userId: { type:[{type:String, required: true}]},
  name: { type: String, required: true },
  img: { type: Buffer }, //store logo
  info: { type: String },
  address: { type: String, required: true }
});

//------------------Function start------------------

storeSchema.statics.findByStoreId = function (storeId){  //find by storeId
  return this.findOne({storeId: storeId});
}

storeSchema.statics.findByUserId = function (userId){  //find by userId
  return this.find({userId: {$elemMatch:userId}});
}

storeSchema.statics.findByName = function (name){  //find by name
  return this.find({name: {$regex: name}});
}

storeSchema.statics.findByInfo = function (info){  //find by info
  return this.find({info: {$regex: info}});
}

storeSchema.statics.findByAddress = function (address){ //find by address
  return this.find({address: {$regex: address}});
}

module.exports = mongoose.model("Store", storeSchema);