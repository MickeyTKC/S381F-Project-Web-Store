const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true},
  product: [{
    storeId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    img: { type:[{type:Buffer}]},
    price: { type: Number, required: true, $gte: 0 },
    info: { type: String },
    qty: { type: Number, required: true, $gte: 0 }
  }]
});

module.exports = mongoose.model("Cart", cartSchema);