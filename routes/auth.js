const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/login", async (req, res, next) => {
  const id = req.body.userId;
  const pw = req.body.password;
  const user = (await User.findByUserId(id)) || {};
  const err = {};
  if (!user) next({ statusCode: 400, message: "User does not exist." });
  if (user.password != pw)
    next({ statusCode: 400, message: "The password is incorrect." });
  if (user.password == pw) {
    // setup express session
    req.session.authenticated = true;
    req.session.user = user;
    if (!req.header("content-type") == "application/json") {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(req.session);
    } else {
      res.redirect("/")
    }
  }
});

router.post("/logout", (req, res, next) => {
  const sessionUser = req.session.user;
  if (!sessionUser)
    return next({
      statusCode: 401,
      message: "Unauthorized, session is empty.",
    });
  req.session = null;
  res.status(200).json({ message: "success" });
});

module.exports = router;
