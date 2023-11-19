//lib modules
const express = require("express");
const app = express();
const session = require("cookie-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const assert = require("assert");

//env
require("dotenv").config();

//config
const port = 3000;
const secret = process.env.secret;
const dbName = process.env.db_name;
const url = process.env.db_url + dbName;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: secret, resave: false, saveUninitialized: true }));
app.use(express.static("public"));
app.use(express.json());

//api routes
// const routes = require("./routes")

//connect to mongodb
mongoose.connection.on("error", err => {
  throw new Error("Mongo database connexion error");
});

//view routes
app.get("/", (req, res) => {
  //res.status(200).render("../views/index.ejs", { auth: req.session });
  res.status(200).send("Stroe");
});
// login
app.get("/login", (req, res) => {
  res.status(200).send("Login");
});
app.get("/signup", (req, res) => {
  res.status(200).send("Sign Up");
});
//product
app.get("/product", (req, res) => {
  res.status(200).send("Product");
});
app.get("/product/id/:id", (req, res) => {
  res.status(200).send("Product/ID");
});
app.get("/product/add", (req, res) => {
    res.status(200).send("Product");
});
app.get("/product/id/:id/edit", (req, res, next) => {
  res.status(200).send("Product/Edit");
});
//user
app.get("/user", (req, res, next) => {
  res.status(200).send("User");
});
app.get("/user/id/:id", (req, res, next) => {
  res.status(200).send("User/ID");
});
app.get("/user/add", (req, res, next) => {
    res.status(200).send("User");
});
app.get("/user/id/edit", (req, res, next) => {
    res.status(200).send("User/ID/Edit");
});
//cart
app.get("/cart", (req, res, next) => {
  res.status(200).send("Cart");
});

//error handler
app.get("/*", (req, res, next) => {
  next({ statusCode: 404, message: "Not Found" });
});
app.use((err, req, res, next) => {
  return res.status(400).send(err.message);
});

//server start
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
