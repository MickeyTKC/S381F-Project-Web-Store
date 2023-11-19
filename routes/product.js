const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Store = require("../models/Store");
const User = require("../models/User");

//const fileupload = require("express-fileupload");
const fs = require("fs");
//router.use(fileupload());

const isLogin = (req, res, next) => {
    const user = req.session.user || { role: "client" };
    if (!user) {
        return next({ statusCode: 403, message: "Permission Required" });
    }
    if (user.role != "operator" && user.role != "admin") {
        return next({ statusCode: 403, message: "Permission Required" });
    }
    return next();
};

// get product request for view all products
router.get("/", async (req, res) => {
    const user = req.session.user || {};
    const products = await Product.find();
    for (p of products) {
        p.img = p.img || "/noImage.jpg";
    }
    res.send(JSON.stringify(products));
});

// get product request for view product details
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByProductId(id);
    var productImg;
    if (product.img) productImg = product.img
        ? productImg
        : "/noImage.jpg";
    res.send(JSON.stringify(product));
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
        tags: req.body.tags.split(",") || "",
        date: new Date().toISOString(),
    };
    try {
        const newProduct = await Product.create(product);
        if (contentType == "application/json") {
            res.status(200).json(newProduct);
        }
    } catch (e) {
        return next(e);
    }
});

// put product request for edit product information
router.post("/id/:id", isLogin, async (req, res) => {
    const contentType = req.header("content-type");
    const err = {};
    // get data
    console.log(req.body);
    const product = {
        productId: req.body.productId,
        name: req.body.name,
        img: req.body.img || "",
        price: req.body.price,
        date: new Date().toISOString(),
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
} catch (e) {
    return next(e);
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

module.exports = router;