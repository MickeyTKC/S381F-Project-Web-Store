const express = require("express");
const app = express();

const port = 3000;
const routes = require("./rotues");

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
