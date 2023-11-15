const mongoose = require('mongoose')
const User = require("./User");

const dbName = "SSProject"
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery",true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

const run = async () =>{
    var createUser = await User.create({
        id:"root",
        password:"root",
        role:"admin",
        name:"Mickey",
        description:"Bad Guy",
        address:"HK",
    })
    console.log(createUser)
    var users = await User.find();
    console.log(users)
}
run();
console.log("finished")