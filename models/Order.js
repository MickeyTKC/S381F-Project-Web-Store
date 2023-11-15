const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  product: [{
    storeId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    img: { type:[{type:Buffer}]},
    price: { type: Number, required: true, $gte: 0 },
    info: { type: String },
    qty: { type: Number, required: true, $gte: 0 }
  }]
})

orderSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Order", orderSchema);