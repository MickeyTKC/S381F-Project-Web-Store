const bodyParser = require("body-parser")
const passport = require("passport")
const ejs = require("ejs")
const mongoose = require("mongoose")

const express = require("express");
const session = require("express-session");
const app = express();

const port = 3000;
const secert = "key";
const routes = require("./routes");

const dbName = "SSProject"
const url = `mongodb+srv://serverSide_User:serrrrver_side1@cluster0.eknv0ni.mongodb.net/${dbName}`;
mongoose.set("strictQuery",true)
mongoose.connect(url).then(()=>{
  console.log("mongoDB connected successfully")
})

//setup view engine
app.set("view engine", "ejs");
//app.use(bodyParser)
//setup session
app.use(
  session({
    secret: secert,
    resave: false,
    saveUninitialized: false,
  })
);
//init passport
app.use(passport.initialize())
//use passport deal with session
app.use(passport.session())


app.get("/", (req, res) => {
  const data = {
    message: "Home page",
    timestamp: new Date(),
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/product", routes.product);
app.use("/store", routes.store);
app.use("/cart", routes.cart);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
