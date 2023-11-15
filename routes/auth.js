const express = require("express");
const app = express();
const router = express.Router();

const User = require("../models/User");

/** 
const passport = require("passport");
router.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ id: id }, function () {
    done(err, user);
  });
});
*/

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

router.post("/login", (req, res) => {
  console.log(req.query)
  console.log(req.params)
  const user = {} // User.find({ userId: id });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(user));
});

router.post("/signup", (req, res) => {});

// Start the server
module.exports = router;
