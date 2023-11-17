const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  img: { type: String }, //store logo
  info: { type: String },
  address: { type: String, required: true }
});

//------------------Function start------------------


module.exports = mongoose.model("Store", storeSchema);