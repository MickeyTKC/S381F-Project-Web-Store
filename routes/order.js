const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");

// the auth for Login required
const auth = (req, res, next) => {
  if (!req.session.user) {
    throw new Error("Login Required");
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
  console.log(err);
  return res.status(400).send(`<h1>${err.message}</h1>`);
});

router.use("/*", (req, res) => {
  res.status(404).send(`<h1>404 Not Found</h1>`);
});

// Start the server
module.exports = router;
