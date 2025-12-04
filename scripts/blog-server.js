// Import required modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the parent directory (blog folder)
app.use(express.static(path.join(__dirname, "..")));

// Define the path to the blogs.json file
const dataPath = path.join(__dirname, "..", "blogs.json");

// Route to handle POST requests for adding a new blog post
app.post("/api/posts", (req, res) => {
    const newPost = req.body;
    const posts = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    posts.push(newPost);
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
    res.status(201).json({ message: "Post added successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});