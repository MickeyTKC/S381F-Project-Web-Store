const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

// the auth for Login required
const auth = (req, res, next) => {
  const user = req.session.user
  const contentType = req.header("content-type")
  const err = {}
  if (!user) {
    err.statusCode = 403
    err.message = "Login Required";
  }
  if (!contentType){
    res.status(err.statusCode).render("../views/error",{user:user,err:err})
  }
  if(err.statusCode){
    next(err)
  }
  next();
};

// get cart request
router.get("/", auth, async (req, res) => {
  const userId = req.session.user.userId;
  const contentType = req.header("content-type");
  const myCart = await Cart.findByUserId(userId);
  if (myCart) {
    for (p of myCart.product) {
      var myCartImg;
      if (p.img) myCartImg = new Buffer(p.img, "base64").toString();
      p.img = myCartImg ? `data:image/jpg;base64,${myCartImg}` : "/noImage.jpg";
    }
  }
  if (contentType == "application/json") {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  } else {
    res.render("../views/cart.ejs", { user: req.session.user, cart: myCart });
  }
});

// post car request for add prouect to cart
router.post("/", auth, async (req, res) => {
  const userId = req.session.user.userId;
  const contentType = req.header("content-type");
  console.log("adding porduct to cart");
});

router.put("/productId/:id", auth, async (req, res, next) => {
  const userId = req.session.user.userId;
  const productOfCart = req.params.id;
  const product = await Product.findByProductId(productOfCart);
  try {
    const checkCart = await Cart.findOne({
      userId: userId,
      product: {
        $elemMatch: {
          productId: productOfCart,
        },
      },
    });
    if (checkCart) {
      next({});
    }
    console.log(
      `put product ${product.productId}-${product.name} from User:${userId} Name:${req.session.user.name}`
    );
    const newProduct = {
      productId: product.productId,
      name: product.name,
      img: "",
      price: product.price,
      qty: 1,
    };
    const pushProduct = await Cart.updateOne(
      { userId: userId },
      { $push: { product: newProduct } }
    );
  } catch (e) {
    next(e);
  }
});

router.delete("/productId/:id", auth, async (req, res, next) => {
  const userId = req.session.user.userId;
  const productOfCart = req.params.id;
  console.log(
    `delete porduct ${req.params.id} from User:${userId} Name:${req.session.user.name}`
  );
  try {
    const cartProduct = await Cart.updateOne(
      { userId: userId },
      { $pull: { product: { productId: productOfCart } } }
    );
  } catch (e) {
    next(e);
  }
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
