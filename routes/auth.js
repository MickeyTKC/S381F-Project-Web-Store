const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");

const User = require("../models/User");

// Define a route for the root URL ("/")
router.get("/", (req, res) => {
  const data = {
    message: "Auth",
    timestamp: new Date(),
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

router.get("/login", (req, res) => {
  res.render("../views/login");
});

router.post("/login", async (req, res) => {
  const id = req.body.userId;
  const pw = req.body.password;


  const user = await User.findOne({ userId: id });
  const message = {};
  if (!user) {
    res.setHeader("Content-Type", "application/json");
    message.err = "User does not exist.";
    res.send(JSON.stringify(message));
  }
  if (user.password != pw) {
    res.setHeader("Content-Type", "application/json");
    message.err = "The password is incorrect.";
    res.send(JSON.stringify(message));
  }
  if (user.password == pw) {
    message.msg = "Login successfully";
    req.session.authenticated = true;
    req.session.user = user;
    req.session.save(()=>{
      console.log('session save')
    })
    res.redirect('/')
  }
});

router.post("/signup", (req, res) => {});

router.post("/logout",(req,res)=>{
  if(!req.session.user){
    throw new Error("Login Required")
  }
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.redirect('/')
})

// Start the server
module.exports = router;