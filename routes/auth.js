const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");

router.post("/login", async (req, res, next) => {
  const id = req.body.userId;
  const pw = req.body.password;
  const user = (await User.findByUserId(id)) || {};
  if (!user)
    if (req.header("content-type") == "application/json")
      return next({ statusCode: 400, message: "User does not exist." });
  if (user.password != pw)
    if (req.header("content-type") == "application/json")
      return next({ statusCode: 400, message: "The password is incorrect." });
  if (user.password == pw) {
    // setup express session
    req.session.authenticated = true;
    req.session.user = user;
    if (req.header("content-type") == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(req.session);
    } else {
      res.redirect("/");
    }
  }
});

router.post("/logout", (req, res, next) => {
  const sessionUser = req.session.user;
  req.session = null;
  if (!req.header("content-type") == "application/json") {
    if (!sessionUser)
      return next({
        statusCode: 401,
        message: "Unauthorized, session is empty.",
      });
    res.status(200).json({ message: "success" });
  } else {
    res.redirect("/");
  }
});

router.post("/signup", async (req, res, next) => {
  // User
  const user = {
    userId: req.body.userId,
    password: req.body.password,
    role: "client",
    name: req.body.name,
    info: req.body.info || "",
    address: req.body.address || "",
    email: req.body.email || "",
    phoneNo: req.body.phoneNo || "",
  };
  // Check input
  if (!user.userId || !user.password || !user.role || !user.name)
    return next({ statusCode: 400, message: "Wrong User Input" });
  // Result Set
  var isExist, client, cart;
  // Execute Query
  try {
    isExist = await User.findByUserId(user.userId);
    client = await User.create(user);
    cart = await Cart.create({ userId: user.userId, product: [] });
  } catch (e) {
    return next(e);
  }
  // Response
  if (!req.header("content-type") == "application/json") {
    if (!client) return next({ statusCode: 400, message: "Database Error." });
    else res.status(200).json({ message: "success" });
  } else {
    res.redirect("/login");
  }
});

router.use((err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

module.exports = router;
