const express = require('express');
const router = express.Router();
const User = require("../models/User")

// Define a route for the root URL ("/")
const auth = (req, res, next) => {
  if (!req.session.user){
    throw new Error("Permission Required")
  }
  if (req.session.user.role!="admin"){
    throw new Error("Admin Permission Required")
  }
  next();
};

router.get('/', auth, async (req, res) => {
  const contentType = req.header("content-type");
  const users = await User.find();
  console.log(users)
  if (contentType == "application/json") {
    res.send(JSON.stringify(users));
  }else{
    res.render("../views/users.ejs",{users:users})
  }
});

router.use((err, req, res, next)=>{
  console.log(err)
  return res.status(400).send(err.message)
})

// Start the server
module.exports = router;