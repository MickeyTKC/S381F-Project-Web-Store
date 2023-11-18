const express = require("express");
const router = express.Router();

const User = require("../models/User");

// get login request, render login page
router.get("/login", (req, res) => {
  res.render("../views/login");
});

// post login request
router.post("/login", async (req, res, next) => {
  // get request data
  const id = req.body.userId;
  const pw = req.body.password;
  // get user data from db 
  const user = await User.findByUserId(id) || {}
  const err = {};
  // wrong input handling
  if (!user) {
    err.statusCode = 400
    err.message = "User does not exist.";
    next(err)
  }
  if (user.password != pw) {
    err.statusCode = 400
    err.message = "The password is incorrect.";
    next(err)
  }
  // correct input handling
  if (user.password == pw) {
    // setup express session
    req.session.authenticated = true;
    req.session.user = user;
    console.log('Login Successfully. session save.')
    res.redirect('/')
  }
});

// post sign up request, create client user
router.post("/signup", async (req, res) => {
  // get request data
  const user = {
    userId : req.body.userId,
    password : req.body.password,
    role : "client",
    name : req.body.name,
    info : req.body.info || "",
    address : req.body.address || "",
    email : req.body.email || "",
    phoneNo : req.body.phoneNo || ""
  }
  // err handling
  const err = {};
  // wrong input handlng
  if(!user.userId || !user.password || !user.role || !user.name){
    err.statusCode = 400
    err.message = "Wrong User Input" 
    next(err)
  }
  // get user data from db for checking
  const isExist = User.findById(user.userId);
  // user id already exists handling
  if(isExist){
    res.setHeader("Content-Type", "application/json");
    err.message = "UserId already exists!" 
    res.send(JSON.stringify(err));
    return;
  }
  // sign up a new client role user
  if(!isExist){
    const client = await User.create(user)
    // add Cart 
    if (!client) {
      err.statusCode = 400
      err.message = "Database Error";
      next(err)
    }
    res.redirect('/')
  }
});

// post logout request
router.post("/logout",(req,res)=>{
  req.session = null;
  console.log('cookie-session destroyed')
  res.redirect('/')
})

// Error handling middleware
router.use((err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  // Default error status code
  const statusCode = err.statusCode || 500;
  // Default error message
  const message = err.message || 'Internal Server Error';
  // Send error response
  res.status(statusCode).json({ error: message });
});
//

module.exports = router;