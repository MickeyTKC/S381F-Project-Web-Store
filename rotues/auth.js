const express = require("express");
const router = express.Router();

var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");

const users = new Array({
  student_id: "11111",
  password: "12345",
  name: "Admin",
  email: "admin@gmail.com",
  address: "KT,KLN",
});

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

router.post("login/password", (req, res) => {
  const user = {
    id: req.body.id,
    password: req.body.password,
  };
  req.login(user, err => {
    res.redirect("/");
  });
});

router.get("/logout", (req, res) => {
  req.session = null; // clear cookie
  res.redirect("/index");
});

// Start the server
module.exports = router;
