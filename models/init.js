const mongoose = require('mongoose')
const User = require("./User");
const Store = require("./Store");
const Order = require("./Order");
const Cart = require("./Cart");
const Product = require("./Product");
const fs = require("fs");

const dbName = process.env.db_name;
const url = process.env.db_url + dbName;

mongoose.set("strictQuery", true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

/**
 * user
 */
const deleteAndCreateUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("Del user");
    const users = JSON.parse(fs.readFileSync("./sampleData/SSProject.users.json", "utf-8"));

    const createdUsers = await User.insertMany(users);
    //console.log('New users created:', createdUsers);
    console.log('New users created');
  } catch (error) {
    console.error('Error:', error);
  }
}
/**
 * store
 */

const deleteAndCreateStore = async () => {
  try {
    await Store.deleteMany({});
    console.log("Del store");

    const stores = JSON.parse(fs.readFileSync("./sampleData/SSProject.stores.json", "utf-8"));

    const createdStores = await Store.insertMany(stores);
    //console.log('New stores created:', createdStores);
    console.log('New stores created');
  } catch (error) {
    console.error('Error:', error);
  }
}
/**
 * product
 */
const deleteAndCreateProduct = async () => {
  try {
    await Product.deleteMany({});
    console.log("Del Product");

    const products = JSON.parse(fs.readFileSync("./sampleData/SSProject.products.json", "utf-8"));

    const createdProducts = await Product.insertMany(products);
    //console.log('New products created:', createdProducts);
    console.log('New products created');
  } catch (error) {
    console.error('Error:', error);
  }
}
/**
 * cart
 */
const deleteAndCreateCart = async () => {
  try {
    await Cart.deleteMany({});
    console.log("Del cart");

    const carts = JSON.parse(fs.readFileSync("./sampleData/SSProject.carts.json", "utf-8"));

    const createdCarts = await Cart.insertMany(carts);
    //console.log('New cart created:', createdCarts);
    console.log('New cart created');
  } catch (error) {
    console.error('Error:', error);
  }
}
/**
 * order
 */
const deleteAndCreateOrder = async () => {
  try {
    await Order.deleteMany({});
    console.log("Del order");

    const orders = JSON.parse(fs.readFileSync("./sampleData/SSProject.orders.json", "utf-8"));

    const createdOrders = await Order.insertMany(orders);
    //console.log('New order created:', createdOrders);
    console.log('New order created');
  } catch (error) {
    console.error('Error:', error);
  }
}

const setupData = async () => {
  try {
    deleteAndCreateUsers();
    deleteAndCreateStore();
    deleteAndCreateProduct();
    deleteAndCreateCart();
    deleteAndCreateOrder();
    console.log('finish');
  } catch (error) {
    console.error('Error:', error);
  }
}

setupData();