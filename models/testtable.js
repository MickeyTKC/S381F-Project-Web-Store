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
const deleteAndCreateUsers = async () => {
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
const deleteAndCreateStore = async () => {
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
/**
 * product
 */
const deleteAndCreateProduct = async () => {
    try {
        await Product.deleteMany({});
        console.log("Del Product");

        const products = [
            {
              storeId: "store1",
              productId: "product1",
              name: "Product 1",
              img: [],
              price: 9.99,
              info: "Product 1 information",
              stock: 100,
              tags: ["tag1", "tag2"]
            },
            {
              storeId: "store2",
              productId: "product2",
              name: "Product 2",
              img: [],
              price: 19.99,
              info: "Product 2 information",
              stock: 50,
              tags: ["tag3", "tag4"]
            },
            {
              storeId: "store3",
              productId: "product3",
              name: "Product 3",
              img: [],
              price: 14.99,
              info: "Product 3 information",
              stock: 200,
              tags: ["tag2", "tag5"]
            },
            {
              storeId: "store4",
              productId: "product4",
              name: "Product 4",
              img: [],
              price: 29.99,
              info: "Product 4 information",
              stock: 75,
              tags: ["tag1", "tag4"]
            },
            {
              storeId: "store1",
              productId: "product5",
              name: "Product 5",
              img: [],
              price: 12.99,
              info: "Product 5 information",
              stock: 80,
              tags: ["tag3", "tag6"]
            },
            {
              storeId: "store2",
              productId: "product6",
              name: "Product 6",
              img: [],
              price: 24.99,
              info: "Product 6 information",
              stock: 150,
              tags: ["tag1", "tag5"]
            },
            {
              storeId: "store3",
              productId: "product7",
              name: "Product 7",
              img: [],
              price: 8.99,
              info: "Product 7 information",
              stock: 120,
              tags: ["tag4", "tag6"]
            },
            {
              storeId: "store4",
              productId: "product8",
              name: "Product 8",
              img: [],
              price: 16.99,
              info: "Product 8 information",
              stock: 90,
              tags: ["tag2", "tag3"]
            },
            {
              storeId: "store1",
              productId: "product9",
              name: "Product 9",
              img: [],
              price: 11.99,
              info: "Product 9 information",
              stock: 50,
              tags: ["tag2", "tag4"]
            },
            {
              storeId: "store3",
              productId: "product10",
              name: "Product 10",
              img: [],
              price: 19.99,
              info: "Product 10 information",
              stock: 75,
              tags: ["tag1", "tag5"]
            }
          ];

        const createdProducts = await Product.insertMany(products);

        console.log('New products created:', createdProducts);
    } catch (error) {
        console.error('Error:', error);
    }
}

//deleteAndCreateUsers();
//deleteAndCreateStore();
deleteAndCreateProduct();