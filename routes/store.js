const express = require("express");
const router = express.Router();

const Product = require("../models/Product")
const Store = require("../models/Store")

const authAdmin = (req, res, next) => {
  if (!req.session.user) {
    throw new Error("Permission Required");
  }
  if (req.session.user.role != "admin") {
    throw new Error("Admin Permission Required");
  }
  next();
};
const authOperator = (req, res, next) => {
  if (!req.session.user) {
    throw new Error("Permission Required");
  }
  if (req.session.user.role != "operator" || req.session.user.role != "admin") {
    throw new Error("Admin/Operator Permission Required");
  }
  next();
};

// get store request for admin views all store
router.get("/", authAdmin, (req, res) => {
  const data = {
    message: "Store",
    timestamp: new Date(),
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

// view store details
router.get("id/:id", (req, res) => {});

// create a new store
router.post("/",authAdmin,(req, res) =>{

})

// edit store information 
router.put("/",authOperator,(req, res) =>{
  //check operator
    //store update
})

// create a new store product
router.post("/product",authOperator,(req, res) =>{
  //check operator
  //store update 
  //product create
})
// edit store product
router.put("/product/id/:id",authOperator,(req, res) =>{
  //check operator
  //product update
})

router.delete("/productt/id/:id",authOperator,(req, res)=>{
  //check operator
  //store update 
  //product delete
})

router.use((err, req, res, next) => {
  return res.status(400).send(`<h1>${err.message}</h1>`);
});

router.use("/*", (req, res) => {
  res.status(404).send(`<h1>404 Not Found</h1>`);
});

// Start the server
module.exports = router;
