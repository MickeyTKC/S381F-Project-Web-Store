const mongoose = require('mongoose')
const User = require("./User");
const Store = require("./Store");
const Order = require("./Order");
const Cart = require("./Cart");
const Product = require("./Product");
const StoreOrder = require("./StoreOrder");

const dbName = "SSProject"
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery",true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

const createUser = async () =>{
    var createUser = await User.create({
        userId: "user03",
        password: "pw",
        role: "client",
        name: "ccccc",
        info: 'infoc',
        address: "HK"
    });
    console.log(createUser);
    var users = await User.find();
    console.log(users);
}
//createUser();
//console.log("finished createUser")

const createStore = async () =>{
    var createStore = await Store.create({
        storeId: "store02",
        userId: ['user01'],
        name: "Store 2",
        img: "",
        info: "info2",
        address:"HK 2"
    });
    console.log(createStore);
    var stores = await Store.find();
    console.log(stores);
}
//createStore();
//console.log("finished createStore")

const createProduct = async () =>{
    var createProduct = await Product.create({
        storeId: 'store02',
        productId: 'p02',
        name: 'FOOD',
        img: ['img'],
        price: 10,
        info: 'food',
        stock: 1,
        tags: ['yummy']
    });
    console.log(createProduct);
    var products = await Product.find();
    console.log(products);
}
//createProduct();
//console.log("finished createProduct")

// const insertStore = async () =>{
//     var insertStore = new Store({
//         storeId: "store03",
//         userId: ['test1', 'test2'],
//         name: "Store 3",
//         img: "",
//         info: "info3",
//         address:"HK 3"
//     });
//     await insertStore.save();
//     console.log(insertStore);
//     var stores = await Store.find();
//     console.log(stores);
// }
//insertStore();
//console.log("finished insertStore")

const createOrder = async () =>{
    var createOrder = await Order.create({
        userId: 'user02',
        orderId: 'order01',
        date: 'date',
        product: [{
          storeId: 'store02',
          productId: 'p01',
          name: 'FOOD',
          img: "",
          price: 10,
          info: 'food',
          qty: 1
        }]
    });
    console.log(createOrder);
    var orders = await Order.find();
    console.log(orders);
}

//createOrder();
//console.log("finished createOrder")

const createCart = async () =>{
    var createCart = await Cart.create({
        userId: 'user03',
        product: [{
          storeId: 'store03',
          productId: 'p02',
          name: 'JP FOOD',
          img: "",
          price: 10,
          info: 'just a food',
          qty: 1
        }]
    });
    console.log(createCart);
    var carts = await Cart.find();
    console.log(carts);
}
//createCart();
//console.log("finished createCart")

const createStoreOrder = async () =>{
    var createStoreOrder = await StoreOrder.create({
        storeId: "store03",
        orderId: "order02",
        date: '2023-11-16T19:14:22.885Z',
        product:{
            productId: "p02",
            name: "JP FOOD",
            qty: 1
        },
        user: {
            userId: "user03",
            address: "HK",
            phoneNo: "81028332"
        }
    });
    console.log(createStoreOrder);
    var carts = await Cart.find();
    console.log(carts);
}
//createStoreOrder();
//console.log("finished createStoreOrder")

//----------------------------------------------------function 
//User
const findByName = async()=>{
    try {
        const user = await User.findByName("t");
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
};
//findByName();
const findByIdE = async()=>{
    try {
        const user = await User.findByIdE("user00", );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
};
//findByIdE();
const testFilter = async()=>{
    try {
        const user = await User.testFilter("user00", "email");
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
}
//testFilter();

//----------------------------------------------------function 
//Product
const findByTag = async()=>{
    try {
        const prod = await Product.findByTag(['JP','yummy']);
        console.log(prod);
      } catch (error) {
        console.log(error.message);
      }
}
//findByTag();
const findByPriceLower = async()=>{
    try {
        const prod = await Product.findByPriceLower(11);
        console.log(prod);
      } catch (error) {
        console.log(error.message);
      }
}
//findByPriceLower();
const findByStockLow = async()=>{
    try {
        const prod = await Product.findByStockLow(4);
        console.log(prod);
      } catch (error) {
        console.log(error.message);
      }
}
//findByStockLow();

//----------------------------------------------------function 
//Store

//----------------------------------------------------function 
//Order
const findByUserId = async()=>{
    try {
        const or = await Order.findByUserId("user02");
        console.log(or);
      } catch (error) {
        console.log(error.message);
      }
}
//findByUserId();

//----------------------------------------------------function 
//StoreOrder
const findByUserId1 = async()=>{
    try {
        const or = await StoreOrder.findByUserId("user02");
        console.log(or);
      } catch (error) {
        console.log(error.message);
      }
}
//findByUserId1();