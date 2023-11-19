const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const product = require("./product");
const store = require("./store");
const cart = require("./cart");

router.use("/auth", auth);
router.use("/user", user);
router.use("/product", product);
router.use("/store", store);
router.use("/cart", cart);

module.exports = router;
