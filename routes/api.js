const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Store = require("../models/Store");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  const user = req.session.user || {};
  const products = await Product.find();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(products));
});

router.get("/products/id/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByProductId(id);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(product));
});

router.post("/login", async (req, res, next) => {
  const id = req.body.userId;
  const pw = req.body.password;
  const user = await User.findByUserId(id);
  const err = {};
  if (!user) {
    err.statusCode = 400;
    err.message = "User does not exist.";
    return next(err);
  }
  if (user.password != pw) {
    err.statusCode = 400;
    err.message = "The password is incorrect.";
    return next(err);
  }
  res.setHeader("Content-Type", "application/json");
  req.session.authenticated = true;
  req.session.user = user;
  res.status(200).json(req.session);
});

router.post("/logout", (req, res, next) => {
  const sessionUser = req.session.user;
  if (!sessionUser)
    return next({
      statusCode: 401,
      message: "Unauthorized, session is empty.",
    });
  req.session = null;
  res.status(200).json({ message: "success" });
});

router.get("/cart", async (req, res) => {
  const { authenticated, user } = req.session;
  if (!authenticated || !user) {
    return next({
      statusCode: 401,
      message: "Unauthorized, login is required",
    });
  }
  res.setHeader("Content-Type", "application/json");
  const cartData = await Cart.findByUserId(user.userId);
  res.status(200).json(cartData);
});

router.put("/cart/productId/:id", async (req, res, next) => {
  const { authenticated, user } = req.session;
  const productId = req.params.id;
  if (!authenticated || !user)
    return next({
      statusCode: 401,
      message: "Unauthorized, session is empty.",
    });
  const product = await Product.findByProductId(productId);
  if (!product)
    return next({
      statusCode: 400,
      message: "Product does not exsit.",
    });
  try {
    const checkCart = await Cart.findOne({
      userId: user.userId,
      product: {
        $elemMatch: {
          productId: productId,
        },
      },
    });
    if (checkCart) {
      next({
        statusCode: 400,
        message: "Product already exsit in the cart",
      });
    }
    const newProduct = {
      productId: product.productId,
      name: product.name,
      img: "",
      price: product.price,
      qty: 1,
    };
    const pushProduct = await Cart.updateOne(
      { userId: user.userId },
      { $push: { product: newProduct } }
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (e) {
    next(e);
  }
});

router.delete("/cart/productId/:id", async (req, res, next) => {
  const { authenticated, user } = req.session;
  if (!authenticated || !user)
    return next({
      statusCode: 401,
      message: "Unauthorized, session is empty.",
    });
  const productOfCart = req.params.id;
  try {
    const cartProduct = await Cart.updateOne(
      { userId: user.userId },
      { $pull: { product: { productId: productOfCart } } }
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Product removed from cart successfully"});
  } catch (e) {
    next(e);
  }
});

router.use((err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

module.exports = router;
