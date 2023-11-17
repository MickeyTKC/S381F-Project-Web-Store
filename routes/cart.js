const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// the auth for Login required
const auth = (req, res, next) => {
  if (!req.session.user) {
    err.message ="Login Required";
    next(err);
  }
  next();
};

// get cart request
router.get("/", auth, async (req, res) => {
  const userId = req.session.user.userId;
  const contentType = req.header("content-type");
  const myCart = await Cart.findByUserId(userId);
  const myCartImg = Buffer.from(myCart.product.img, 'base64');
  myCart.product.img = myCartImg;
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  } else {
    res.render("../views/cart.ejs", { cart: myCart });
  }
});

// post car request for add prouect to cart
router.post("/", auth, async (req, res) => {
  const userId = req.session.user.userId;
  const contentType = req.header("content-type");
  console.log("adding porduct to cart")
});

router.put("/", auth, async (req, res) => {
  console.log("edit cart porduct qty")
})

router.use((err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  // Default error status code
  const statusCode = err.statusCode || 500;
  // Default error message
  const message = err.message || 'Internal Server Error';
  // Send error response
  res.status(statusCode).json({ error: message });
});

// Start the server
module.exports = router;
