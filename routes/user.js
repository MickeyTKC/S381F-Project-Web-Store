const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");

// the auth for permission request
const isLogin = (req, res, next) => {
    const user = req.session.user || { role: "client" };
    if (!user) {
        return next({ statusCode: 403, message: "Permission Required" });
    }
    if (user.role != "admin") {
        return next({ statusCode: 403, message: "Admin Permission Required" });
    }
    return next();
};
  
// get user request for user view all user
router.get("/", isLogin, async (req, res) => {
    const self = req.session.user
    const users = await User.find();

    res.send(JSON.stringify(users));
});

// get user request by id
router.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findByUserId(id);
    const self = req.session.user;
    // Error handling
    if (!user) {
        next({ statusCode: 502, message: "User does not exist." });
    }
    res.send(JSON.stringify(user));
});


// post user request for add new user
router.post("/", isLogin, async (req, res) => {
    // get request data
    const user = {
        userId: req.body.userId,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        info: req.body.info || "",
        address: req.body.address || "",
        email: req.body.email || "",
        phoneNo: req.body.phoneNo || "",
    };
    // err handling
    const err = {};
    // wrong input handlng
    if (!user.userId || !user.password || !user.role || !user.name) {
        res.setHeader("Content-Type", "application/json");
        err.message = "Wrong User Input";
        res.send(JSON.stringify(err));
        return;
    }
    // get user data from db for checking
    const isExist = await User.findByUserId(user.userId);
    console.log(isExist);
    // user id already exists handling
    if (isExist) {
        res.setHeader("Content-Type", "application/json");
        err.message = "UserId already exists!";
        res.send(JSON.stringify(err));
        return;
    }
    // sign up a new client role user
    if (!isExist) {
        const client = await User.create(user);
        // add Cart
        const cart = await Cart.create({ userId: user.userId, product: [] });
        console.log(cart);
        if (!client) {
            res.setHeader("Content-Type", "application/json");
            err.message = "Database Error";
            res.send(JSON.stringify(err));
        }
        res.redirect("/");
    }
});

// put user request for edit new user
router.post("/id/:id/edit", isLogin, async (req, res) => {
    console.log("Edit User Infomation");
    const contentType = req.header("content-type");
    const err = {};
    console.log(req.params.id);
    const user = {
        password: req.body.password,
        name: req.body.name,
        info: req.body.info || "",
        address: req.body.address || "",
        email: req.body.email || "",
        phoneNo: req.body.phoneNo || "",
    };
    if ((req.session.user.role) == "admin") {
        user.role = req.body.role;
    }
    console.log(user);
    try {
        const editUser = await User.findOneAndUpdate(
            { userId: req.params.id },
            user
        );
        if (contentType == "application/json") {
            res.status(200).json(editUser);
        }else{
            res.redirect(`/user/id/${req.params.id}`);
        }
    } catch (e) {
        return next(e);
    }   
});

router.delete("/id/:id", isLogin, async (req, res) => {
    console.log("Del User Infomation");
    const contentType = req.header("content-type");
    const err = {};
    try {
        const delUser = await User.findOneAndDelete({ userId: req.params.id });
        if (contentType == "application/json") {
            res.status(200).json(delUser);
        }
        if (!contentType) {
            res.redirect("/user");
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