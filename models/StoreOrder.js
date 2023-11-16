const mongoose = require("mongoose");

const storeOrderSchema = new mongoose.Schema({
  storeId: {type: String, required: true},
  orderId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  address: {type: String},
  phoneNo: {type: String},
  date: { type: String, required: true },
  qty: { type: Number, required: true, $gte: 0 }
})

module.exports = mongoose.model("StoreOrder", storeOrderSchema); 