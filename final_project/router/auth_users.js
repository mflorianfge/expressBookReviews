const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Function to check if a username is valid
const isValid = (username) => {
    return users.some(user => user.username === username);
};

// Function to check if the username and password match a registered user
const authenticatedUser = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    return !!user;
};

// Login route for registered users
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    if (!isValid(username)) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, "your_jwt_secret_key", { expiresIn: "1h" });
    req.session.token = token;

    return res.status(200).json({ message: "Login successful", token });
});

// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;
    const username = req.user.username;

    if (!review) {
        return res.status(400).json({ message: "Review content is required" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated successfully", book: books[isbn] });
});

// DELETE a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
  }

  const reviews = books[isbn].reviews;
  if (!reviews[username]) {
      return res.status(404).json({ message: "Review not found for this user" });
  }

  delete reviews[username];

  return res.status(200).json({ message: "Review deleted successfully", book: books[isbn] });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
