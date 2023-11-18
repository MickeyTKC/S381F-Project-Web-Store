const mongo = require("mongodb");

const collectionString = "";
const client = new mongo.MongoClient(collectionString)
let conn;
const dbName = "web-store"

try{
    conn = await client.connect();
}catch(e){
    console.log(e);
}

const db = conn.db(dbName)
db.createCollection("User")
db.createCollection("Cart")
db.createCollection("Order")
db.createCollection("Store")
db.createCollection("Goods")

db.users.insertOne({
  userId: "user123",
  password: "password123",
  role: "client",
  name: "John Doe",
  info: "Additional user information",
  address: "123 Main Street"
})

db.carts.insertOne({
  userId: "user123",
  goods: [
    {
      storeId: "store456",
      goodId: "good789",
      name: "Product 1",
      img: ["image1.jpg", "image2.jpg"],
      price: 10.99,
      info: "Product information",
      qty: 2
    },
    // Add more goods objects if needed
  ]
})

db.orders.insertOne({
  userId: "user123",
  orderId: "order789",
  date: ISODate("2021-10-01"),
  goods: [
    {
      storeId: "store456",
      goodId: "good789",
      name: "Product 1",
      img: ["image1.jpg", "image2.jpg"],
      price: 10.99,
      info: "Product information",
      qty: 2
    },
    // Add more goods objects if needed
  ]
})

// fake image that should be a Buffer base64 data type
db.stores.insertOne({
  storeId: "store456",
  userId: ["user123", "user456"],
  name: "Example Store",
  img: "storeimage.jpg",
  info: "Store information",
  address: "456 Elm Street"
})

db.goods.insertOne({
  storeId: "store456",
  goodId: "good789",
  name: "Product 1",
  img: ["image1.jpg", "image2.jpg"],
  price: 10.99,
  info: "Product information",
  stock: 10,
  tags: ["tag1", "tag2"]
})


export default db;