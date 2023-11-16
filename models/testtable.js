const mongoose = require('mongoose')
const User = require("./User");
const Store = require("./Store");
const Order = require("./Order");
const Cart = require("./Cart");
const Product = require("./Product");
const StoreOrder = require("./StoreOrder");

const dbName = "SSProject"
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;

mongoose.set("strictQuery", true)


mongoose.connect(url)
console.log(mongoose.connection.readyState);

/**
 * user
 */
const deleteAndCreateUsers = async () =>{
    try {
        await User.deleteMany({});
        console.log("Del user");
        const users = [
            {
                userId: 'client1',
                password: 'password1',
                role: 'client',
                name: 'John Doe',
                info: 'Regular client',
                address: '123 Main St',
                email: 'john@example.com',
                phoneNo: '123-456-7890'
            },
            {
                userId: 'client2',
                password: 'password2',
                role: 'client',
                name: 'Jane Smith',
                info: 'Preferred client',
                address: '456 Elm St',
                email: 'jane@example.com',
                phoneNo: '987-654-3210'
            },
            {
                userId: 'client3',
                password: 'password3',
                role: 'client',
                name: 'Michael Johnson',
                info: 'Frequent buyer',
                address: '789 Oak St',
                email: 'michael@example.com',
                phoneNo: '555-123-4567'
            },
            {
                userId: 'operator1',
                password: 'password1',
                role: 'operator',
                name: 'Alex Johnson',
                info: 'Senior operator',
                address: '123 Main St',
                email: 'alex@example.com',
                phoneNo: '123-456-7890'
            },
            {
                userId: 'operator2',
                password: 'password2',
                role: 'operator',
                name: 'Emma Smith',
                info: 'Junior operator',
                address: '456 Elm St',
                email: 'emma@example.com',
                phoneNo: '987-654-3210'
            },
            {
                userId: 'operator3',
                password: 'password3',
                role: 'operator',
                name: 'Ryan Davis',
                info: 'Experienced operator',
                address: '789 Oak St',
                email: 'ryan@example.com',
                phoneNo: '555-123-4567'
            },
            {
                userId: 'operator4',
                password: 'password4',
                role: 'operator',
                name: 'Sophie Wilson',
                info: 'Shift supervisor',
                address: '321 Maple Ave',
                email: 'sophie@example.com',
                phoneNo: '111-222-3333'
            },
            {
                userId: 'admin1',
                password: 'password1',
                role: 'admin',
                name: 'Admin User 1',
                info: 'System administrator',
                address: '123 Main St',
                email: 'admin1@example.com',
                phoneNo: '123-456-7890'
            },
            {
                userId: 'admin2',
                password: 'password2',
                role: 'admin',
                name: 'Admin User 2',
                info: 'Database administrator',
                address: '456 Elm St',
                email: 'admin2@example.com',
                phoneNo: '987-654-3210'
            },
            {
                userId: 'operator5',
                password: 'password5',
                role: 'operator',
                name: 'Daniel Thompson',
                info: 'Trainee operator',
                address: '567 Pine Rd',
                email: 'daniel@example.com',
                phoneNo: '444-555-6666'
            }
        ];

        const createdUsers = await User.insertMany(users);

        console.log('New users created:', createdUsers);
    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * store
 */
const deleteAndCreateStore = async () =>{
    try {
        await Store.deleteMany({});
        console.log("Del store");

        const stores = [
            {
                storeId: 'store1',
                userId: ['operator1', 'operator4'],
                name: 'Store 1',
                img: null,
                info: 'Store 1 information',
                address: '123 Store St'
            },
            {
                storeId: 'store2',
                userId: ['operator2'],
                name: 'Store 2',
                img: null,
                info: 'Store 2 information',
                address: '456 Store St'
            },
            {
                storeId: 'store3',
                userId: ['operator3'],
                name: 'Store 3',
                img: null,
                info: 'Store 3 information',
                address: '789 Store St'
            },
            {
                storeId: 'store4',
                userId: ['operator5'],
                name: 'Store 4',
                img: null,
                info: 'Store 4 information',
                address: '321 Store St'
            }
        ];

        const createdStores = await Store.insertMany(stores);

        console.log('New stores created:', createdStores);
    } catch (error) {
        console.error('Error:', error);
    }
}

deleteAndCreateUsers();
deleteAndCreateStore();