const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Store = require("../models/Store");

const auth = (req, res, next) => {
  if (!req.session.user) {
    throw new Error("Permission Required");
  }
  if (req.session.user.role != "operator" || req.session.user.role != "admin") {
    throw new Error("Admin/Operator Permission Required");
  }
  next();
};

// get product request for view all products
router.get("/", async (req, res) => {
  const contentType = req.header("content-type");
  const products = await Product.find();
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(products));
  } else {
    res.render("../views/products.ejs", { products: products });
  }
});

// get product request for view product details
router.get("/id/:id", async (req, res) => {
  const contentType = req.header("content-type");
  const id = req.params.id;
  const product = await Product.findByProductId(id);
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(product));
  } else {
    res.render("../views/product.ejs", { product: product });
  }
});

// get product request for searching product by name
router.get("/name/:name", async (req, res) => {
  const contentType = req.header("content-type");
  const name = req.params.name;
  console.log(name);
});

router.get("/tags/:tags", async (req, res) => {
  const contentType = req.header("content-type");
  const tags = req.params.tags;
  const searcTags = words.split(" ");
  console.log(searcTags);
});

router.get("/priceLower/:price", async (req, res) => {
  const contentType = req.header("content-type");
  const price = req.params.price;
  console.log(price);
});

router.get("/priceGreater/:price", async (req, res) => {
  const contentType = req.header("content-type");
  const price = req.params.price;
  console.log(price);
});

// get product request for searching product by keywords
router.get("/search/:words", async (req, res) => {
  const contentType = req.header("content-type");
  const words = req.params.words;
  const keywords = words.split(" ");
  console.log(keywords);
});

// post product request for create new porduct
router.post("/", auth, async (req, res) => {
  const contentType = req.header("content-type");
  // check operator
  const operatorId = req.session.user.userId;
  const store = await Store.findByUserId(operatorId);
  const err = {};
  if (!store) {
    res.setHeader("Content-Type", "application/json");
    err.message = "The user is not the operator of the store.";
    res.send(JSON.stringify(err));
    return;
  }
  // get data
  const product = {
    storeId: req.body.storeId,
    productId: `${req.body.storeId}-${req.body.productId}`,
    name: req.body.name,
    img: [],
    price: req.body.price,
    info: req.body.info,
    stock: 0,
    tags: [],
  };
  console.log(product);
});

// put product request for edit porduct information
router.put("/", auth, async (req, res) => {
  const contentType = req.header("content-type");
  // check operator
  const operatorId = req.session.user.userId;
  const store = await Store.findByUserId(operatorId);
  const err = {};
  if (!store) {
    res.setHeader("Content-Type", "application/json");
    err.message = "The user is not the operator of the store.";
    res.send(JSON.stringify(err));
    return;
  }
  // get data
  const product = {
    storeId: req.body.storeId,
    productId: `${req.body.storeId}-${req.body.productId}`,
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    info: req.body.info,
    stock: req.body.stock,
    tags: req.body.tags,
  };
  console.log(product);
});

// Start the server
module.exports = router;
