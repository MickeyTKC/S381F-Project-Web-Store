# S381F-Project-Web-Store
## Group Info
Tse Kai Chun (Mickey) 12755669, 
Mak Ho Ying (Kiris) 12755670, 
Tang Chung Ming (Ming) 13176370,
LAI Hon San (Hanson) 13329470,

## Introduction
The main purpose of web store prototype system is to provide a simplified demonstration of an e-commerce platform. It showcases essential features that include user authentication, product browsing, and favoriting functionality. The system allows users to log in to their accounts, browse through a catalog of products, view detailed information about each product, and add or remove products from their favorites list.

**Roles**
- Visitor
- Client
- Operator
- Admin

## Function
**Core Functions**
- Login
- Logout
- Sign Up
- View Products
- View Product Detail
- Add Product to My Favorite
- Remove Product  from My Favorite

**Function of Roles**
- Visitor
	 1. Login
	 2. Sign Up
	 3. View Products
	 4. View Product Detail
- Client
	1. Logout
	2. View Products
	3. View Product Details
	4. Add Product to My Favorite
	5. Remove Product  from My Favorite
	6. View Self Information
	7. Edit Self Information
- Operator
	1. Logout
	2. View Products
	3. View Product Details
	4. Add Product to My Favorite
	5. Remove Product  from My Favorite
	6. View Self Information
	7. Edit Self Information
	8. Add Product
	9. Edit Product 
- Admin
	 1. Logout
	2. View Products
	3. View Product Details
	4. Add Product to My Favorite
	5. Remove Product  from My Favorite
	6. View Self Information
	7. Edit Self Information
	8. Add Product
	9. Edit Product 
	10. View Users 
	11. Add User 
	12. Edit User
	13. Edit Store Information

## Navigation
**Route of Views**
 `/`
`/login`
`/signup`
`/product`
`/product/id/:id`
`/product/add`
`/product/id/:id/edit`
`/user`
`/user/id/:id`
`/user/id/`
`/user/add`
`/user/id/:id/edit`
`/cart`
`/store`
`/store/edit`
## Operation Guides
> We provide two commands for the program in `package.json`
1. `npm start` 
Server Start
2. `npm run init` 
Init test data to database 

> The sample account of the system ref: `/sampleData/SSProject.users.json`

Client:
- User ID: client1
- Password: password1

Operator:
- User ID: operator1
- Password: password1

Admin :
- User ID: admin1
- Password: password1

### User Interface Guides
> Login [core]
- Click Login of Navbar 
- Enter user id and password
	- Message "Login success" if enter is correct 
	- Message "User does not exist" if wrong user id
	- Message "The password is incorrect" if wrong password
-  Back to home page and the navbar will be updated

> Sign up [core] 
- Click Login of Navbar 
- Click Sign Up in  Have not account ? Sign Up Now !
- Complete the form 
	`Only the admin can edit user information currently, please be careful to fill the form`
	- Message "Wrong User Input" if missing user id or password or name 
	- Message "The password at least 8 characters" if password aleaset 8 characters
	- Message "The user ID is already taken" if the userid existed in database.
	- Move to login page if sign up successfully

> Logout [core]
- Click Logout of Navbar 
-  Move home page

> View Products [core]
- Click Product of Navbar 
- Move to products page

> View Product Details [core]
- Click Product of navbar 
- Click the button View Details of chosen product
- Move to product detalis page

> Add proudct to My Favorite [core]
- In product detalis page
- Click the button Add to My Favorite
	- Message "Login Required" if you are visitor
	- Message "Cart had this product already" if My Favorite had this product
	- Message "Put product to cart successfully" if product added to My Favorite
	
> View My Favorite [core]
- Click My Favorite of navbar 
	- Move to login page if you are visitor
	- Move to cart page if logged in to system
	- 
> Delete product from My Favorite [core]
- In cart page Ref: <View My Favorite [core]>
- Click the button Delete of chosen product
	- Reload page of delete product from cart successfully

> View My Info
- Click My Info of navbar 
	- Move to login page if you are visitor
	- Move to user information page  if you are visitor

> Add Product
- In products page Ref: <View Product Details [core]>
- Click the button Add in bottom right
	- Move to Error page if you are visitor or client and trying access that page
- Complete the fom
	- Alert "An error occurred while editing the product" if add product is fail
	- Alert "Product edited successfully" and move to porduct page if add product is success

> Edit Product
- In product details page Ref: <View Product Details [core]>
- Click the button Edit in bottom right
	- Move to Error page if you are visitor or client and trying access that page
- Complete the fom
	- Alert "An error occurred while editing the product" if edit product is fail
	- Alert "Product edited successfully" and move to porduct page if edit product is success

> View Users
- Click Users of navbar 
	- The nav item Users only display if you are admin
	- Move to error page if you are not admin and trying access that page
- Move to users page

> Add User 
- In users page Ref: < View User >
- Click the button Add in bottom right
	- Move to Error page if you are not admin and trying access that page
- Complete the form
	- Alert "An error occurred while editing the user" if add user is fail
	- Move to users page if add user is success

> Edit User
- In users page Ref: < View User >
- Click Detail of chosen user
- Move to user information page
- Click the button Edit in bottom right
	- Move to Error page if you are not admin and trying access that page
-  Complete the form
	- Alert "An error occurred while editing the user" if edit user is fail
	- Move to users page if edit user is success
 
 > Edit Store
 - In home page
 - Click the button Edit in bottom right
	 -  The button Edit  only display if you are admin
	 -  Move to Error page if you are not admin and trying access that page
 - Move to the Store From 
-  Complete the form
	- Alert "An error occurred while editing the store" if edit store is fail
	- Move to home page if edit user is success
### Restful API Guides
*only provide success case, the error case please view the files of `/routes`
*for the permission Ref< Function.Function of Roles >


> /api/login
Case 1: Valid login credentials
Request:
```json
POST /api/login
Body:
{
  "userId": "client1",
  "password": "password1"
}
```
Response:
```json
Status: 200 OK
Content-Type: application/json
{
  "user": {
    "userId": "client1",
    "password": "password1",
    "role": "client",
    "name": "John Doe",
    "info": "Regular client",
    "address": "123 Main St",
    "email": "john@example.com",
    "phoneNo": "123-456-7890"
  },
  "message": "Login Success"
}
```
Case 2: Invalid user ID
Request:
```json
POST /api/login
Body:
{
  "userId": "invaliduser",
  "password": "password1"
}
```
Response:
```json
Status: 400 Bad Request
Content-Type: application/json
{
  "error": "User does not exist."
}
```
Case 3: Incorrect password
Request:
```json
POST /api/login
Body:
{
  "userId": "client1",
  "password": "incorrectpw"
}
```
Response:
```json
Status: 400 Bad Request
Content-Type: application/json

{
  "error": "The password is incorrect."
}
```
> /api/logout
Case 1: Successful logout
Request:
```json
POST /api/logout
```
Response:
```json
Status: 200 OK
Content-Type: application/json

{
  "message": "success"
}
```
Case 2: Unauthorized logout
Request:
```json
POST api/logout
```
Response:
```json
Status: 401 Unauthorized
Content-Type: application/json

{
  "error": "Unauthorized, session is empty."
}
```
> /api/signup
Case 1: Successful signup
Request:
```json
POST /api/signup
Body:
{
  "userId": "newuser",
  "password": "newpassword",
  "role": "client",
  "name": "New User",
  "info": "New client",
  "address": "789 Elm St",
  "email": "newuser@example.com",
  "phoneNo": "555-555-5555"
}
```
Response:
```json
Status: 200 OK
Content-Type: application/json

{
  "message": "success"
}
```
Case 2: Existing user ID
Request:
```json
POST /api/signup
Body:
{
  "userId": "client1",
  "password": "newpassword",
  "role": "client",
  "name": "New User",
  "info": "New client",
  "address": "789 Elm St",
  "email": "newuser@example.com",
  "phoneNo": "555-555-5555"
}
```
Response:

```json
Status: 409 Conflict
Content-Type: application/json

{
  "error": "The user ID is already taken"
}
```
Case 3: Missing required fields
Request:
```json
POST /api/signup
Body:
{
  "userId": "newuser",
  "password": "newpassword",
  "name": "New User"
}
```
Response:
```json
Status: 400 Bad Request
Content-Type: application/json

{
  "error": "Wrong User Input"
}
```
Case 4: Invalid password length
Request:
```json
POST /api/signup
Body:
{
  "userId": "newuser",
  "password": "shortpw",
  "role": "client",
  "name": "New User"
}
```
Response:
```json
Status: 400 Bad Request
Content-Type: application/json

{
  "error": "The password at least 8 characters"
}
```

> GET /api/product
Case 1: User is logged in and has a cart

Request: 
```
GET /api/product
```
Response:
```json
[
  {
    "productId": "product1",
    "name": "Product 1",
    "img": "/noImage.jpg",
    "price": 9.99
  },
  {
    "productId": "product2",
    "name": "Product 2",
    "img": "/img/product2.jpg",
    "price": 14.99
  }
]
```
> GET /api/product/id/:id
Case 1: Product exists

Request: 
```
GET /api/product/id/product1
```
Response:
```json
{
  "productId": "product1",
  "name": "Product 1",
  "img": "/noImage.jpg",
  "price": 9.99
}
```
> POST /api/product
Case 1: Create a new product
Request:
```json
POST /api/product
Content-Type: application/json

{
  "productId": "product3",
  "name": "Product 3",
  "img": "/img/product3.jpg",
  "price": 19.99,
  "discount": "10%",
  "info": "This is product 3",
  "tags": "tag1,tag2,tag3"
}
```
 - Response:
```json
{
  "productId": "product3",
  "name": "Product 3",
  "img": "/img/product3.jpg",
  "price": 19.99,
  "discount": "10%",
  "info": "This is product 3",
  "tags": ["tag1", "tag2", "tag3"],
  "date": "2022-01-01T00:00:00.000Z"
}
```
> POST /api/product/id/:id
Case 1: Update product information
Request:
```json
POST /api/product/id/product1
Content-Type: application/json

{
  "name": "Updated Product 1",
  "img": "/img/updated_product1.jpg",
  "price": 12.99,
  "discount": "15%",
  "info": "This is the updated product 1",
  "tags": "tag1,tag2"
}
```
- Response:
```json
{
  "productId": "product1",
  "name": "Updated Product 1",
  "img": "/img/updated_product1.jpg",
  "price": 12.99,
  "discount": "15%",
  "info": "This is the updated product 1",
  "tags": ["tag1", "tag2"],
  "date": "2022-01-01T00:00:00.000Z"
}
```
> DELETE /api/product/productId/:id
Case 1: Delete a product
Request:
```
DELETE /api/product/productId/product2
```
Response:
```json
{
  "productId": "product2",
  "name": "Product 2",
  "img": "/img/product2.jpg",
  "price": 14.99
}
```

> GET /api/cart
Case 1: User is logged in and has a cart
Request: 
```
GET /api/cart
```
Response:
```json
{
  "cart": {
    "userId": "user1",
    "product": [
      {
        "productId": "product1",
        "name": "Product 1",
        "img": "/noImage.jpg",
        "price": 9.99
      },
      {
        "productId": "product2",
        "name": "Product 2",
        "img": "/img/product2.jpg",
        "price": 14.99
      }
    ]
  }
}
```
Case 2: User is not logged in
```
Request: GET /api/cart
```
Response:
```json
{
  "error": "Login Required"
}
```
> PUT /api/cart/productId/:id
Case 1: Add a product to the cart
Request:
```json
PUT /api/cart/productId/product3
Content-Type: application/json

{
  "productId": "product3",
  "name": "Product 3",
  "img": "/img/product3.jpg",
  "price": 19.99
}
```
 - Response:
```json
{
  "message": "Put product to cart successfully",
  "cart": {
    "userId": "user1",
    "product": [
      {
        "productId": "product1",
        "name": "Product 1",
        "img": "/noImage.jpg",
        "price": 9.99
      },
      {
        "productId": "product2",
        "name": "Product 2",
        "img": "/img/product2.jpg",
        "price": 14.99
      },
      {
        "productId": "product3",
        "name": "Product 3",
        "img": "/img/product3.jpg",
        "price": 19.99,
        "qty": 1
      }
    ]
  }
}
```
> DELETE /api/cart/productId/:id
Case 1: Remove a product from the cart
Request: 
```
DELETE /api/cart/productId/product2
```
Response:
```json
{
  "message": "Delete product from cart successfully",
  "cart": {
    "userId": "user1",
    "product": [
      {
        "productId": "product1",
        "name": "Product 1",
        "img": "/noImage.jpg",
        "price": 9.99
      }
    ]
  }
}
```
GET /api/store
Case: Retrieve store details
Request: 
```
GET /api/store
```
Response:
```json
{
  "storeId": "store1",
  "name": "My Store",
  "img": "/img/store_logo.jpg",
  "info": "Welcome to My Store",
  "address": "123 Main Street",
  "phoneNo": "123-456-7890"
}
```
POST /api/store/edit
Case: Edit store information
Request:
```json
POST /edit
Content-Type: application/json

{
  "name": "New Store Name",
  "img": "/img/new_logo.jpg",
  "info": "Updated store information",
  "address": "456 Elm Street",
  "phoneNo": "987-654-3210"
}
```

 - Response:
```json
{
  "message": "Edit store info successfully"
}
```

> GET /api/user
Case: Retrieve all users
Request: 
```
GET /api/user
```
Response:
```json
[
  {
    "userId": "user1",
    "password": "********",
    "role": "admin",
    "name": "John Doe",
    "info": "User information",
    "address": "123 Main Street",
    "email": "johndoe@example.com",
    "phoneNo": "123-456-7890"
  },
  {
    "userId": "user2",
    "password": "********",
    "role": "client",
    "name": "Jane Smith",
    "info": "",
    "address": "456 Elm Street",
    "email": "janesmith@example.com",
    "phoneNo": "987-654-3210"
  }
]
```
> GET /api/user/id/:id
Case: Retrieve user by ID
Request: 
```
GET /api/user/id/user1
```
Response:
```json
{
  "userId": "user1",
  "password": "********",
  "role": "admin",
  "name": "John Doe",
  "info": "User information",
  "address": "123 Main Street",
  "email": "johndoe@example.com",
  "phoneNo": "123-456-7890"
}
```
> POST /api/user/add
Case: Add a new user
Request:
```json
POST /api/user/add
Content-Type: application/json

{
  "userId": "user3",
  "password": "********",
  "role": "client",
  "name": "Sarah Johnson",
  "info": "New user information",
  "address": "789 Oak Street",
  "email": "sarahjohnson@example.com",
  "phoneNo": "555-123-4567"
}
```
 - Response:
```json
{
  "message": "success"
}
```
> POST /api/user/id/:id/edit
Case: Edit user information
Request:
```json
POST /api/user/id/user2/edit
Content-Type: application/json

{
  "password": "********",
  "name": "Jane Smith",
  "info": "Updated user information",
  "address": "456 Elm Street",
  "email": "janesmith@example.com",
  "phoneNo": "987-654-3210"
}
```
 - Response:
```json
{
  "userId": "user2",
  "password": "********",
  "role": "client",
  "name": "Jane Smith",
  "info": "Updated user information",
  "address": "456 Elm Street",
  "email": "janesmith@example.com",
  "phoneNo": "987-654-3210"
}
```
DELETE /api/user/id/:id
Case: Delete user
Request: 
```
DELETE /api/user/id/user3
```
Response:
```json
{
  "userId": "user3",
  "password": "********",
  "role": "client",
  "name": "Sarah Johnson",
  "info": "New user information",
  "address": "789 Oak Street",
  "email": "sarahjohnson@example.com",
  "phoneNo": "555-123-4567"
}
```
