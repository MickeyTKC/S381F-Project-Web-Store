const express = require("express");
const router = express.Router();
const User = require("../models/User");

// the auth for permission request
const auth = (req, res, next) => {
  const user = req.session.user || {role:"client"} ;
  const contentType = req.header("content-type");
  const err = {};
  if (!user) {
    err.statusCode = 403;
    err.message = "Permission Required";
  }
  if (user.role != "admin") {
    err.statusCode = 403;
    err.message = "Admin Permission Required";
  }
  console.log(err);
  if (!contentType && err.statusCode) {
    res
      .status(err.statusCode)
      .render("../views/error", { user: user, err: err });
  }
  if (contentType && err.statusCode) {
    next(err);
  }
  next();
};

// get user request for user view all user
router.get("/", auth, async (req, res) => {
  const contentType = req.header("content-type");
  const self = req.session.user
  const users = await User.find();
  // contentType handling
  if (contentType == "application/json") {
    res.send(JSON.stringify(users));
  } else {
    res.render("../views/users.ejs", { users: users ,user:self});
  }
});

// get user request by id
router.get("/id/:id", async (req, res) => {
  const contentType = req.header("content-type");
  const id = req.params.id;
  const user = await User.findByUserId(id);
  const self = req.session.user;
  // Error handling
  const err = {};
  // contentType handling
  if (contentType == "application/json") {
    if (!user) {
      err.message = "User does not exist.";
      err.statusCode = 502;
      next(err);
    }
    res.send(JSON.stringify(user));
  } else {
    res.render("../views/user.ejs", { user: user, self: self });
  }
});

router.get("/id/:id/edit", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByUserId(id);
  const self = req.session.user;
  // Error handling
  const err = {};
});

// post user request for add new user
router.post("/", auth, async (req, res) => {
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
  const isExist = User.findById(user.userId);
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
    if (!client) {
      res.setHeader("Content-Type", "application/json");
      err.message = "Database Error";
      res.send(JSON.stringify(err));
    }
    res.redirect("/");
  }
});

// put user request for edit new user
router.put("/id/:id", auth, async (req, res) => {
  console.log("Edit User Infomation (AdminPermission)");
  const contentType = req.header("content-type");
  const err = {};
  const user = {
    password: req.body.password,
    role: req.body.role,
    name: req.body.name,
    info: req.body.info || "",
    address: req.body.address || "",
    email: req.body.email || "",
    phoneNo: req.body.phoneNo || "",
  };
  console.log(user);
  try {
    const editUser = await User.findOneAndUpdate(
      { userId: req.params.id },
      user
    );
    if (contentType == "application/json") {
      res.status(200).json(editUser);
    }
    if (!contentType) {
      res.redirect("/user");
    }
  } catch (e) {
    next(e);
  }
});

//user(client/operator) edit information
router.put("/id/:id", async (req, res) => {
  console.log("Edit User Infomation");
  const contentType = req.header("content-type");
  const err = {};
  const user = {
    password: req.body.password,
    name: req.body.name,
    info: req.body.info || "",
    address: req.body.address || "",
    email: req.body.email || "",
    phoneNo: req.body.phoneNo || "",
  };
  console.log(user);
  try {
    const editUser = await User.findOneAndUpdate(
      { userId: req.params.id },
      user
    );
    if (contentType == "application/json") {
      res.status(200).json(editUser);
    }
    if (!contentType) {
      res.redirect("/user");
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/id/:id", auth, async (req, res) => {
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
