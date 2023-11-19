//lib modules
const express = require("express");
const app = express();
const session = require("cookie-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const assert = require("assert");

//env
require("dotenv").config();

//config
const port = 3000;
const secret = process.env.secret;
const dbName = process.env.db_name;
const url = process.env.db_url + dbName;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));
app.use(express.static("public"));
app.use(express.json());

//api routes
const routes = require("./routes");

//mongoose models
const { User, Store, Order, Cart, Product } = require("./models");

//connect to mongodb
mongoose.set("strictQuery", true);
mongoose.connect(url).then(() => {
  console.log("mongoDB connected successfully");
});
mongoose.connection.on("error", err => {
  throw new Error("Mongo database connexion error");
});

//auth
const auth = {
  isLogin: (req, res, next) => {
    next({ statusCode: 401, message: "Login is required" });
  },
  isOperator: (req, res, next) => {
    next({ statusCode: 403, message: "Operator Permission is required" });
  },
  isAdmin: (req, res, next) => {
    next({ statusCode: 403, message: "Admin Permission is required" });
  },
};
//api
app.use("/api", routes);

//view routes
app.get("/", async (req, res, next) => {
  var store;
  try {
    store = await Store.findOne({});
  } catch (e) {
    next({ statusCode: 400, message: "Bad request" });
  }
  res.status(200).render("../views/store", {
    auth: req.session || {},
    store: store || {},
  });
});
app.get("/store/edit", async (req, res, next) => {
  res.status(200).render("../views/store", { auth: req.session || {} });
});
// login
app.get("/login", (req, res, next) => {
  res.status(200).render("../views/login", { auth: req.session || {} });
});
app.get("/signup", (req, res) => {
  res.status(200).render("../views/signup", { auth: req.session || {} });
});
//product
app.get("/product", async (req, res, next) => {
  var products;
  try {
    products = await Product.find();
  } catch (e) {
    next(e);
  }
  res.status(200).render("../views/products", {
    auth: req.session || {},
    products: products,
  });
});
app.get("/product/id/:id", async (req, res) => {
  var product;
  try {
    product = await Product.findByProductId(req.params.id);
  } catch (e) {
    next(e);
  }
  res
    .status(200)
    .render("../views/product", { auth: req.session || {}, product: product });
});
app.get("/product/add", (req, res) => {
  res.status(200).send("Product");
});
app.get("/product/id/:id/edit", (req, res, next) => {
  res.status(200).send("Product/Edit");
});
//user
app.get("/user", (req, res, next) => {
  res.status(200).send("User");
});
app.get("/user/id/:id", (req, res, next) => {
  res.status(200).send("User/ID");
});
app.get("/user/add", (req, res, next) => {
  res.status(200).send("User");
});
app.get("/user/id/edit", (req, res, next) => {
  res.status(200).send("User/ID/Edit");
});
//cart
app.get("/cart", auth.isLogin, (req, res, next) => {
  res.status(200).send("Cart");
});

//error handler
app.get("/*", (req, res, next) => {
  next({ statusCode: 404, message: "Not Found" });
});
app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .render("../views/error.ejs", { err: err, auth: req.session || {} });
});

//server start
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
