const bodyParser = require("body-parser");
const passport = require("passport");
const ejs = require("ejs");
const mongoose = require("mongoose");

const express = require("express");
const session = require("express-session");
const app = express();

const port = 3000;
const secert = "key";
const routes = require("./routes");
const { throws } = require("assert");

const dbName = "SSProject";
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;
mongoose.set("strictQuery", true);
mongoose.connect(url).then(() => {
  console.log("mongoDB connected successfully");
});

//setup view engine
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//setup session
app.use(
  session({
    secret: secert,
    resave: false,
    saveUninitialized: true,
  })
);

const auth = (req, res, next) => {
  if (!req.session.user){
    throw new Error("login required")
  }
  next();
};

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const user = req.session.user || {}
  console.log(Object.keys(user).length>0?`ID:${user.id},Role:${user.role}`:"Empty")
  res.status(200).render("../views/index.ejs",{user:user})
});

app.use("/auth", routes.auth);
app.use("/user", auth ,routes.user);
app.use("/product", routes.product);
app.use("/store", routes.store);
app.use("/cart", routes.cart);

app.use((err, req, res, next)=>{
  console.log(err)
  return res.status(400).send(err.message)
})

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
