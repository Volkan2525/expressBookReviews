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
//write code to check if username and password match the one we have in records.
/*users.forEach((user)=>{
    //console.log(user.username+"---"+username);
    if(user.username===username)
        return true;
    
});
return false;*/
    return users.some(user => user.username===username && user.password===password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let usr = req.body.username;
  let pwd = req.body.password;
  
console.log(authenticatedUser(usr,pwd));
  if(authenticatedUser(usr,pwd))
    return res.status(200).json({message: "Login successfull"})
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
