const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true},
  product: [{
    productId: { type: String, required: true},
    name: { type: String, required: true },
    img: { type:String},
    price: { type: Number, required: true, $gte: 0 },
    discount: {type: Number},
    qty: { type: Number, required: true, $gte: 0 }
  }]
});

//------------------Function start------------------

cartSchema.statics.findByUserId = function (userId){  //find by userId
  return this.findOne({userId: userId});
}

module.exports = mongoose.model("Cart", cartSchema);