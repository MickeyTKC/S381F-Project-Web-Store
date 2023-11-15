const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const productSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  productId: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  img: { type:[{type:Buffer}]},
  price: { type: Number, required: true, $gte: 0 },
  info: { type: String },
  stock: { type: Number, required: true, $gte: 0 },
  tags: { type:[{type:String}]}
})

productSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", productSchema);