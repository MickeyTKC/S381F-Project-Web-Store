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
  res.setHeader("Content-Type", "application/json");

  const user = await User.findOne({ userId: id });
  const message = {};
  if (!user) {
    message.err = "User does not exist.";
    res.send(JSON.stringify(message));
    res.redirect("/login");
  }
  if (user.password != pw) {
    message.err = "The password is incorrect.";
    res.send(JSON.stringify(message));
    res.redirect("/login");
  }
  if (user.password == pw) {
    message.msg = "Login successfully";
    res.send(JSON.stringify(message));
    req.session.authenticated = true;
    req.session.user = user;
    req.session.save()
  }
});

router.post("/signup", (req, res) => {});

router.post("/logout",(req,res)=>{
  req.session.destroy(() => {
    console.log('session destroyed')
  })
})

// Start the server
module.exports = router;
