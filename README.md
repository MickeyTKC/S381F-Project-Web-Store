# S381F-Project-Web-Store
## Group Info
Tse Kai Chun (Mickey) 12755669, 
Mak Ho Ying (Kiris) 12755670, 

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
Comming Soon
