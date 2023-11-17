const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");

const User = require("../models/User");

// get login request, render login page
router.get("/login", (req, res) => {
  res.render("../views/login");
});

// post login request
router.post("/login", async (req, res) => {
  // get request data
  const id = req.body.userId;
  const pw = req.body.password;
  // get user data from db 
  const user = await User.findByUserId(id)
  const err = {};
  // wrong input handling
  if (!user) {
    res.setHeader("Content-Type", "application/json");
    err.message = "User does not exist.";
    res.send(JSON.stringify(err));
    return;
  }
  if (user.password != pw) {
    res.setHeader("Content-Type", "application/json");
    err.message = "The password is incorrect.";
    res.send(JSON.stringify(err));
    return;
  }
  // correct input handling
  if (user.password == pw) {
    // setup express session
    req.session.authenticated = true;
    req.session.user = user;
    req.session.save(()=>{
      console.log('Login Successfully. session save.')
    })
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
    res.setHeader("Content-Type", "application/json");
    err.message = "Wrong User Input" 
    res.send(JSON.stringify(err));
    return;
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
      res.setHeader("Content-Type", "application/json");
      err.message = "Database Error";
      res.send(JSON.stringify(err));
    }
    res.redirect('/')
  }
});

// post logout request
router.post("/logout",(req,res)=>{
  if(!req.session.user){
    throw new Error("Login Required")
  }
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.redirect('/')
})

module.exports = router;