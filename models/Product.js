const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const productSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  img: [{
    img: { type: String }
  }],
  price: { type: Number, required: true, $gte: 0 },
  info: { type: String },
  stock: { type: Number, required: true, $gte: 0 },
  tags: [{
    tags: { type: String }
  }]
})

productSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", productSchema);