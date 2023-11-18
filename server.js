const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const express = require("express");
const session = require("cookie-session");
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
app.use(express.json());
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

app.use(express.static("public"));

mongoose.connection.on("error", err => {
  throw new Error("Mongo database connexion error");
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const user = req.session.user;
  console.log(
    user ? `ID:${user.userId},Name:${user.name},Role:${user.role}` : "Empty"
  );
  res.status(200).render("../views/index.ejs", { user: user });
});

app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/product", routes.product);
app.use("/store", routes.store);
app.use("/cart", routes.cart);
app.use("/api", routes.api);

app.use((err, req, res, next) => {
  return res.status(400).send(err.message);
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
