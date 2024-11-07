const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop using Axios with async/await
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('https://api.example.com/books'); // Simulate external API call
    return res.status(200).json(response.data); // Respond with book list
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book list" });
  }
});

// Get book details based on ISBN using Axios with async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`https://api.example.com/books/isbn/${isbn}`); // Simulate external API call
    return res.status(200).json(response.data); // Respond with book details based on ISBN
  } catch (error) {
    return res.status(500).json({ message: `Error fetching details for ISBN ${isbn}` });
  }
});
  
// Get book details based on author using Axios with Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  axios.get(`https://api.example.com/books/author/${author}`) // Simulate external API call
    .then(response => res.status(200).json(response.data)) // Respond with book details based on author
    .catch(error => res.status(500).json({ message: `Error fetching details for author ${author}` }));
});

// Get all books based on title using Axios with Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  axios.get(`https://api.example.com/books/title/${title}`) // Simulate external API call
    .then(response => res.status(200).json(response.data)) // Respond with book details based on title
    .catch(error => res.status(500).json({ message: `Error fetching details for title ${title}` }));
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
