const express = require("express");
const router = express.Router();
//const fileupload = require("express-fileupload");
const fs = require("fs");

const Product = require("../models/Product");
const Store = require("../models/Store");

//router.use(fileupload());

const isLogin_Admin = (req, res, next) => {
    const user = req.session.user || { role: "client" }
    if (!user) {
        return next({ statusCode: 403, message: "Permission Required" });
    }
    if (user.role != "admin") {
        return next({ statusCode: 403, message: "Admin Permission Required" });
    }
    next();
};
/*
  const isLogin_Operator = (req, res, next) => {
    const user = req.session.user || {role:"client"}
    if (!user) {
      next({ statusCode: 403, message: "Permission Required" });
    }
    if (user.role != "operator" || user.role != "admin" ) {
      next({ statusCode: 403, message: "Admin/Operator Permission Required" });
    }
    next();
  };
*/
// view store details
router.get("/", async (req, res) => {
    const user = req.session.user || {};
    const storeData = await Store.findOne({});
    //res.status(200).render("../views/store", { user: user, store: storeData });
    //res.send(JSON.stringify(user));
    res.send(JSON.stringify(storeData));
});

router.get("/edit", isLogin_Admin, async (req, res) => {
    const user = req.session.user || {};
    const storeData = await Store.findOne({});

    //res.status(200).render("../views/storeEdit", { user: user, store: storeData });
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
    };
    console.log(store);
    await Store.updateOne({ storeId: storeData.storeId }, { $set: store });
    res.redirect("/store");
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