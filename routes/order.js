const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");

// the auth for Login required
const auth = (req, res, next) => {
  if (!req.session.user) {
    err.message ="Login Required";
    next(err);
  }
  next();
};

// get order request for admin view all
router.get("/", auth, async (req, res) => {
    console.log("get all order of the sys")
});

// get order request for view order detail
router.get("/orderId:/id", auth, async (req, res) => {
    console.log("get all order of the sys")
});

// get order request for user view their own orders 
router.get("/userId/:id", auth, async (req, res) => {
    console.log("get all oder of user ")
});

// post order request for all product of the cart
router.post("/", auth, async (req, res) => {
    console.log("order from cart all porducts")
});

// post order request for one product of the cart
router.post("/productId/:id", auth, async (req, res) => {
    console.log("order from cart porduct qty")
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
