const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true},
  userId: { type:[{type:String, required: true}]},
  name: { type: String, required: true },
  img: { type: Buffer }, //store logo
  info: { type: String },
  address: { type: String, required: true }
});

module.exports = mongoose.model("Store", storeSchema);