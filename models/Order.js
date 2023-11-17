const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  address: {type: String},
  phoneNo: {type: String},
  payment: {type: String},
  product: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    img: { type:String},
    price: { type: Number, required: true, $gte: 0 },
    qty: { type: Number, required: true, $gte: 0 }
  }]
})

//------------------Function start------------------

orderSchema.statics.findByUserId = function (userId){  //find by userId
  return this.find({userId: userId}).sort({date:1});
}

orderSchema.statics.findByOrderId = function (orderId){  //find by orderId
  return this.findOne({orderId: orderId});
}

module.exports = mongoose.model("Order", orderSchema);