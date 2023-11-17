const mongoose = require("mongoose");

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

//------------------Function start------------------

productSchema.statics.findByStoreId = function (storeId){  //find by storeId
  return this.find({storeId: storeId});
}

productSchema.statics.findByProductId = function (productId){  //find by productId
  return this.findOne({productId: productId});
}

productSchema.statics.findByName = function (name){  //find by name
  return this.find({name: {$regex: name}});
}

productSchema.statics.findByInfo = function (info){  //find by info
  return this.find({info: {$regex: info}});
}

productSchema.statics.findByTag = function (tag){ //find by tag
  return this.find({tags: {$elemMatch:{$in: tag}}});
}

productSchema.statics.findByPriceLower = function (price){ //find lower by price
  return this.find({price: {$lte : price}});
}

productSchema.statics.findByPriceGreater = function (price){ //find greater by price
  return this.find({price: {$gte : price}});
}

productSchema.statics.findByStockLow = function (number){ //find stock which is low
  return this.find({stock: {$lte: number}});
}

// productSchema.statics.filter = function (Product){ //filter
//   return this.find();
// }

module.exports = mongoose.model("Product", productSchema);