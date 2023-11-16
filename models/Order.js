const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  address: {type: String},
  phoneNo: {type: String},
  payment: {type: String},
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

//------------------Function start------------------

orderSchema.statics.findByUserId = function (userId){  //find by userId
  return this.find({userId: userId}).sort({date:1});
}

module.exports = mongoose.model("Order", orderSchema);