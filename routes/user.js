const express = require('express');
const router = express.Router();
const User = require("../models/User")

// the auth for permission request
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

router.get("/id/:id", async (req, res) => {
  const contentType = req.header("content-type");
  const id = req.params.id
  const user = await User.findByUserId(id)
  console.log(user)
  const self = req.session.user
  // Error handling
  const err = {}
  if (contentType == "application/json") {
    if(!user) {
      err.message = "User does not exist."
      res.send(err)
      return;
    }
    res.send(JSON.stringify(user));
  }else{
    res.render("../views/user.ejs",{user:user,self:self})
  }
})

router.use((err, req, res, next)=>{
  console.log(err)
  return res.status(400).send(`<h1>${err.message}</h1>`)
})

// Start the server
module.exports = router;