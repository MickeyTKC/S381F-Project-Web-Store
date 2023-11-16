const express = require("express");
const router = express.Router();

// Define a route for the root URL ("/")
router.get("/", (req, res) => {
  const data = {
    message: "Product",
    timestamp: new Date(),
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

router.get("/id/:id", (req, res) => {
  const data = {
    message: "Product",
    timestamp: new Date(),
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

// Start the server
module.exports = router;
