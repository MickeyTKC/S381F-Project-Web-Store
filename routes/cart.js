const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isLogin = (req, res, next) => {
  const user = req.session.user;
  const contentType = req.header("content-type");
  if (!user) next({ statusCode: 403, message: "Login Required" });
  next();
};

router.get("/", isLogin, async (req, res) => {
  const userId = req.session.user.userId;
  const myCart = await Cart.findByUserId(userId);
  if (myCart) for (p of myCart.product) p.img = p.img || "/img/noImage.jpg";
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(myCart);
});

router.put("/productId/:id", isLogin, async (req, res, next) => {
  const userId = req.session.user.userId;
  const productId = req.params.id;
  console.log(
    `put product ${product.productId}-${product.name} from User:${userId} Name:${req.session.user.name}`
  );
  var product, cart;
  try {
    product = new Product(await Product.findByProductId(productId));
    cart = new Cart(await Cart.findByUserId(userId));
  } catch (e) {
    next(e);
  }
  if (!product) next({ statusCode: 400, message: "Product does not exist" });
  if (cart.product.filter(p => p.productId == productId) > 0)
    next({
      statusCode: 400,
      message: `Cart had this product already`,
      product: product,
    });
  try {
    const newProduct = {
      productId: product.productId,
      name: product.name,
      img: product.img,
      price: product.price,
      qty: 1,
    };
    cart.product.push(newProduct);
    cart.save();
  } catch (e) {}
  res.setHeader("Content-Type", "application/json");
  res
    .status(200)
    .json({ message: `Put product to cart successfully`, cart: cart });
});

router.delete("/productId/:id", isLogin, async (req, res, next) => {
  const userId = req.session.user.userId;
  const producId = req.params.id;
  console.log(
    `delete porduct ${req.params.id} from User:${userId} Name:${req.session.user.name}`
  );
  var cart;
  try {
    cart = new Cart(await Cart.updateOne());
    if (cart.product.length <= 0)
      next({ statusCode: 400, message: "Cart is empty" });
    if (cart.product.filter(p => p.productId == producId).length <= 0)
      next({ statusCode: 400, message: "Product does not exist in Cart" });
    cart.product.map(p => p.productId != producId);
    cart.save;
  } catch (e) {
    next(e);
  }
  res
    .status(200)
    .json({ message: `Delete product to cart successfully`, cart: cart });

  router.use((err, req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    // Default error status code
    const statusCode = err.statusCode || 500;
    // Default error message
    const message = err.message || "Internal Server Error";
    // Send error response
    res.status(statusCode).json({ error: message });
  });
});
module.exports = router;
