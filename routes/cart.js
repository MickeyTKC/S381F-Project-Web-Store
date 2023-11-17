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
  console.log(err);
  return res.status(400).send(`<h1>${err.message}</h1>`);
});

router.use("/*", (req, res) => {
  res.status(404).send(`<h1>404 Not Found</h1>`);
});

// Start the server
module.exports = router;
