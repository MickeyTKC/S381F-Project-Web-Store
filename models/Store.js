const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: [{
    userId: { type: String, required: true }
  }],
  name: { type: String, required: true },
  img: { type: String }, //store logo
  info: { type: String },
  address: { type: String, required: true }
});

storeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Store", storeSchema);