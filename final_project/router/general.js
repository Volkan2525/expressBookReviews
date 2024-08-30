const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  bookList = JSON.stringify(books,null,4);
  if (bookList)
    res.send(bookList);
  else
    return res.status(300).json({message: "Book list not found"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbnParam = req.params.isbn;
  let bookFound = books[isbnParam]
  if(bookFound)
    return res.send(bookFound)
  else
    return res.status(300).json({message: "Book not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authorParam = req.params.author;
  let bookArray = books;
  console.log(bookArray)
  let bookFound = bookArray.forEach(element => {
    if(element['author']==authorParam)
        return element
  });

  if(bookFound)
    return req.send(bookFound)
  else
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  isbnParam = req.params.isbn;
  let foundBook = books[isbnParam];
  if(foundBook)
    res.send(foundBook["reviews"]);
  else
    return res.status(300).json({message: "Error"});
});

module.exports.general = public_users;
