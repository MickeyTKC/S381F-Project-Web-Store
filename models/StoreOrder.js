const mongoose = require("mongoose");

const storeOrderSchema = new mongoose.Schema({
  storeId: {type: String, required: true},
  orderId: { type: String, required: true, unique: true },
  date: { type: String, required: true }, 
  product:{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true, $gte: 0 }
  }, 
  user: {
    userId: { type: String, required: true },
    address: {type: String},
    phoneNo: {type: String}
  }
})

//------------------Function start------------------

storeOrderSchema.statics.findByStoreId = function (storeId){  //find by storeId
  return this.find({storeId: storeId});
}

storeOrderSchema.statics.findByOrderId = function (orderId){  //find by orderId
  return this.find({orderId: orderId});
}

storeOrderSchema.statics.findByUserId = function (userId){  //find by userId
  return this.find({'user.userId': userId});
}
  
module.exports = mongoose.model("StoreOrder", storeOrderSchema); 