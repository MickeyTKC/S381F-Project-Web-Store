const { MongoClient } = require("mongodb");

// MongoDB connection URL
const url = "mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/?retryWrites=true&w=majority";
const dbName = "SSProject";

let conn;
const client = new MongoClient(url);

const connect = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("connected MongoDB SUCCESSFULLY");
    const colName = "User";
    const user = db.collection(colName)
    console.log("connected MongoDB SUCCESSFULLY");
    const result = await user.find().toArray();
    console.log(result)
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  } finally {
    await client.close();
  }
};

connect()
//module.exports = connect;

