const express = require("express");
const router = express.Router();
//const fileupload = require("express-fileupload");
const fs = require("fs");

const Product = require("../models/Product");
const Store = require("../models/Store");

//router.use(fileupload());

const isLogin = (req, res, next) => {
    const user = req.session.user || { role: "client" }
    if (!user) {
        return next({ statusCode: 403, message: "Permission Required" });
    }
    if (user.role != "admin") {
        return next({ statusCode: 403, message: "Admin Permission Required" });
    }
    return next();
};
// view store details
router.get("/", async (req, res) => {
    const user = req.session.user || {};
    const storeData = await Store.findOne({});

    res.send(JSON.stringify(storeData));
});


// edit store information
router.post("/edit", async (req, res) => {
    //store update
    const contentType = req.header("content-type");
    const err = {};
    // get data
    const storeData = await Store.findOne({});
    console.log(storeData.storeId);
    const store = {
        name: req.body.name,
        img: req.body.img || "", //store logo
        info: req.body.info || "",
        address: req.body.address,
        phoneNo: req.body.phoneNo
    };
    console.log(store);
    await Store.updateOne({ storeId: storeData.storeId }, { $set: store });
    res.status(200).json({"message":"Edit store info successfully"});
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