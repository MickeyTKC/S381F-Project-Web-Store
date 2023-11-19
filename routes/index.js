const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.status(200).json({ message: "Calling API" });
});

router.use("/*", (req, res) => {
  res.header("Content-Type", "application/json");
  res.status(404).json({ statusCode: 404, message: "Not Found" });
});

module.exports = router;
