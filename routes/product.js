const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Store = require("../models/Store");
const User = require("../models/User");

const fileupload = require("express-fileupload");
const fs = require("fs");

router.use(fileupload());

const auth = (req, res, next) => {
  const err = {};
  if (!req.session.user) {
    err.statusCode = 403;
    err.message = "Permission Required";
    next(err);
  }
  if (req.session.user.role != "operator" && req.session.user.role != "admin") {
    err.statusCode = 403;
    err.message = "Admin/Operator Permission Required";
    next(err);
  }
  next();
};

// get product request for view all products
router.get("/", async (req, res) => {
  const contentType = req.header("content-type");
  const user = req.session.user || {};
  const products = await Product.find();
  for(p of products){
    p.img = p.img || "/noImage.jpg";
  }
  console.log(products)
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(products));
  } else {
    res.render("../views/products.ejs", { products: products, user: user });
  }
});

// get product request for view product details
router.get("/id/:id", async (req, res) => {
  const contentType = req.header("content-type");
  const id = req.params.id;
  const product = await Product.findByProductId(id);
  var productImg;
  if (product.img) productImg = product.img
    ? productImg
    : "/noImage.jpg";
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(product));
  } else {
    res.render("../views/product.ejs", {
      user: req.session.user,
      product: product,
    });
  }
});

// get product request for view product details
router.get("/id/:id/edit", async (req, res) => {
  const contentType = req.header("content-type");
  const id = req.params.id;
  const product = await Product.findByProductId(id);
  var productImg;
  if (product.img) productImg = product.img
    ? productImg
    : "/noImage.jpg";
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(product));
  } else {
    res.render("../views/productEdit.ejs", {
      user: req.session.user,
      product: product,
    });
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

router.get("/discount/:discount", async (req, res) => {
  const contentType = req.header("content-type");
  const discount = req.params.discount;
  console.log(discount);
});

// get product request for searching product by keywords
router.get("/search/:words", async (req, res) => {
  const contentType = req.header("content-type");
  const words = req.params.words;
  const keywords = words.split(" ");
  console.log(keywords);
});

// post product request for create new porduct
router.post("/", async (req, res, next) => {
  const contentType = req.header("content-type");
  const err = {};
  // get data
  const product = {
    productId: req.body.productId,
    name: req.body.name,
    img: req.body.img || "",
    price: req.body.price,
    discount: req.body.discount || "",
    info: req.body.info || "",
    tags: [] || "",
    date: new Date().toISOString(),
  };
  try {
    const newProduct = await Product.create(product);
    if (contentType == "application/json") {
      res.status(200).json(newProduct);
    }
    if (!contentType) {
      res.redirect("/product");
    }
  } catch (e) {
    next(e);
  }
});

// put product request for edit product information
router.post("/id/:id", auth, async (req, res) => {
  const contentType = req.header("content-type");
  const err = {};
  // get data
  const product = {
    //productId: req.body.productId,
    name: req.body.name,
    img: req.body.img || "",
    price: req.body.price,
    discount: req.body.discount || "",
    info: req.body.info || "",
    tags: req.body.tags || "",
  };
  console.log(product);
  try {
    const editProduct = await Product.findOneAndUpdate(
      { productId: req.params.id },
      product
    );
    if (contentType == "application/json") {
      res.status(200).json(editProduct);
    }
    if (!contentType) {
      res.redirect("/product");
    }
  } catch (e) {
    next(e);
  }
  res.redirect(`/product/id/${req.params.id}`);
});

router.use((err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  // Default error status code
  const statusCode = err.statusCode || 500;
  // Default error message
  const message = err.message || "Internal Server Error";
  // Send error response
  res.status(statusCode).json({ error: message });
});

// Start the server
module.exports = router;
