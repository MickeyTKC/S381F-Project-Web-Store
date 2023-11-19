const mongoose = require('mongoose')
const User = require("./User");
const Store = require("./Store");
const Order = require("./Order");
const Cart = require("./Cart");
const Product = require("./Product");

const dbName = "SSProject"
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery",true)


mongoose.connect(url)

const run = async () =>{
    var users = await Store.findOne();
    console.log(users)
}

run();
console.log("finished")