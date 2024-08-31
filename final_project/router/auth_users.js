const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
username != ""

}

const authenticatedUser = (username,password)=>{ //returns boolean
    let userFound = users.filter(user => user.username===username && user.password===password);
    if(userFound.length>0)
        return true;
    else
        return false;
    //return users.some(user => user.username===username && user.password===password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let usr = req.body.username;
  let pwd = req.body.password;
  

  if(authenticatedUser(usr,pwd)){
    let authSession=jwt.sign({data:pwd},"access",{expiresIn:60});
    req.session.auth = {authSession,usr};
    return res.status(200).json({message: "Login successful"})
  }
  else
    return res.status(300).json({message: "Login error"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
