const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  usernameP = req.body.username;
  passwordP = req.body.password;

  let userExists = users.filter(function(userF){
    return userF.username===usernameP;
  });
//console.log(userExists);
  if(userExists.length>0)
    return res.status(300).json({message: "User already exists"});
  else
  {
      let result = users.push({"username":usernameP,"password":passwordP});
    if (result)
        return res.send("User addded");
    else
        return res.status(300).json({message: "Yet to be implemented"});
  }


});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let listPromise=new Promise((resolve,reject)=>{
    try{
        resolve(JSON.stringify(books,null,4));

    }
    catch
    {
        reject(res.status(404).json({"message":"Book list error"}));        
    }
  });

  listPromise.then((resolve,reject)=>{
  if (resolve)
    res.send(resolve);
  else
    return res.send(reject);
  });
  

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbnParam = req.params.isbn;
  let isbnPromise=new Promise((resolve,reject)=>{
    try{
        let bookFound = books[isbnParam];
        resolve(bookFound);
    }
    catch{
        reject(res.status(404).json({message: "Book not found"}));
    }

  });

  isbnPromise.then((resolve,reject)=>{
    if(resolve)
        res.send(resolve);
    else
        res.send(reject);
   });
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authorParam = req.params.author;
  const bookArray = Object.keys(books);

  bookArray.forEach(element => {
    if(books[element]['author']==authorParam)
        res.send(books[element])
  });

    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    let titleParam = req.params.title;
    const bookArray = Object.keys(books);
  
    bookArray.forEach(element => {
      if(books[element]['title']==titleParam)
          res.send(books[element])
    });
  
      //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  isbnParam = req.params.isbn;
  let foundBook = books[isbnParam];
  if(foundBook)
    res.send(foundBook["reviews"]);
  else
    return res.status(300).json({message: "Reviews error"});
});

module.exports.general = public_users;
