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
    if (!req.session.userId)
      next({ statusCode: 401, message: "Login is required" });
    next();
  },
  isOperator: (req, res, next) => {
    if (!req.session.userId)
      next({ statusCode: 401, message: "Login is required" });
    const { user } = req.session;
    if (user.role != "operator")
      return next({
        statusCode: 403,
        message: "Operator Permission is required",
      });
    next();
  },
  isOperatorOrAdmin: (req, res, next) => {
    if (!req.session.userId)
      next({ statusCode: 401, message: "Login is required" });
    const { user } = req.session;
    if (user.role == "client")
      return next({
        statusCode: 403,
        message: "Operator/Admin Permission is required",
      });
    next();
  },
  isAdmin: (req, res, next) => {
    if (!req.session.userId)
      next({ statusCode: 401, message: "Login is required" });
    const { user } = req.session;
    if (user.role != "admin")
      return next({
        statusCode: 403,
        message: "Operator Permission is required",
      });
    next();
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
    return next({ statusCode: 400, message: "Bad request" });
  }
  res.status(200).render("../views/store", {
    auth: req.session || {},
    store: store || {},
  });
});
app.get("/store/edit", async (req, res, next) => {
  var store;
  try {
    store = await Store.findOne({});
  } catch (e) {
    return next({ statusCode: 400, message: "Bad request" });
  }
  res.status(200).render("../views/storeForm", { auth: req.session || {} ,store: store || {},});
});
// login
app.get("/login", (req, res, next) => {
  res.status(200).render("../views/login", { auth: req.session || {} });
});
// sign
app.get("/signup", (req, res) => {
  res.status(200).render("../views/signup", { auth: req.session || {} });
});
//product
app.get("/product", async (req, res, next) => {
  var products;
  try {
    products = await Product.find();
  } catch (e) {
    return next(e);
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
    return next(e);
  }
  res
    .status(200)
    .render("../views/product", { auth: req.session || {}, product: product });
});
app.get("/product/add", (req, res) => {
  const url = `/api/product/`;
  res.status(200).render("../views/productForm", {
    auth: req.session || {},
    product: {},
    action: "add",
    url: url,
  });
});
app.get(
  "/product/id/:id/edit",
  auth.isOperatorOrAdmin,
  async (req, res, next) => {
    var product;
    try {
      product = await Product.findByProductId(req.params.id);
    } catch (e) {
      return next(e);
    }
    const url = `/api/product/id/${product.productId}`;
    res.status(200).render("../views/productForm", {
      auth: req.session || {},
      product: product || {},
      action: "edit",
      url: url,
    });
  }
);
//user
app.get("/user", auth.isAdmin, async (req, res, next) => {
  var users;
  try {
    users = await User.find();
  } catch (e) {
    return next(e);
  }
  res
    .status(200)
    .render("../views/users", { auth: req.session || {}, users: users });
});
app.get("/user/id/:id", async (req, res, next) => {
  var user;
  try {
    user = await User.findByUserId(req.params.id);
  } catch (e) {
    return next(e);
  }
  res
    .status(200)
    .render("../views/user", { auth: req.session || {}, user: user });
});
app.get("/user/add", (req, res, next) => {
  const url = "/api/user/add";
  res.status(200).render("../views/userForm", {
    user: {},
    auth: req.session || {},
    action: "add",
    url: url,
  });
});
app.get("/user/id/:id/edit", auth.isAdmin, async (req, res, next) => {
  var user;
  try {
    user = await User.findByUserId(req.params.id);
  } catch (e) {
    return next(e);
  }
  const url = `/api/user/id/${user.userId}/edit`;
  res.status(200).render("../views/userForm", {
    auth: req.session || {},
    user: user,
    action: "edit",
    url: url,
  });
});
//cart
app.get("/cart", auth.isLogin, async (req, res, next) => {
  const userId = req.session.userId;
  var myCart;
  try {
    myCart = await Cart.findByUserId(userId);
  } catch (e) {
    return next(e);
  }
  if (myCart) {
    for (p of myCart.product) {
      p.img = p.img || "/img/noImage.jpg";
    }
  }
  res
    .status(200)
    .render("../views/cart.ejs", { auth: req.session, cart: myCart,action: "edit" });
});
//store
app.get("/store", async (req, res, next) => {
  var storeData;
  try {
    storeData = await Store.findOne({});
  } catch (e) {
    return next(e);
  }
  res
    .status(200)
    .render("../views/store", { auth: req.session || {}, store: storeData });
});
app.get("/store/edit", auth.isAdmin, async (req, res, next) => {
  var storeData;
  try {
    storeData = await Store.findOne({});
  } catch (e) {
    return next(e);
  }
  res
    .status(200)
    .render("../views/storeForm", { auth: req.session || {}, store: storeData, action: "edit"});
});

//error handler
app.get("/*", (req, res, next) => {
  return next({ statusCode: 404, message: "Not Found" });
});
app.use((err, req, res, next) => {
  if (err.statusCode == 401) res.redirect("/login");
  else
    res
      .status(err.statusCode)
      .render("../views/error.ejs", { err: err, auth: req.session || {} });
});

//server start
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
