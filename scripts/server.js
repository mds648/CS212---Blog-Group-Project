const express = require("express");
const fs = require("fs").promises;
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = 3000;
const BLOGS_FILE_PATH = path.join(__dirname, 'blogs.json');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));

// API endpoint to update the like count for a blog post 
app.post('/api/like/:id', async (req, res) => {
    // initialize post ID
    const postID = req.params.id;
    try {
        // read contents of blogs.json
        const data = await fs.readFile(BLOGS_FILE_PATH, 'utf8');
        let posts = JSON.parse(data);

        // find post by ID
        const postIndex = posts.findIndex(p => p.id === postID);
        // ensure post was found
        if (postIndex === -1) {
            // provide error if not found
            return res.status(404).json({ 
                error: 'Post not found'
            });
        }

        // increment the global like count
        posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
        const newLikeCount = posts[postIndex].likes;

        // write array into blogs.json file
        await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 4), 'utf8');
        console.log(`Post ${postID} liked. New like count: ${newLikeCount}`);
        // send the global count to client
        res.json({ 
            success: true, newLikeCount: newLikeCount 
        });
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).json({ 
            error: 'Failed to update post data on server!' 
        });
    }
})

function getUsers() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../users.json')));
}

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({success: false, message: "Invalid login"});
    }

    res.json({
        success: true,
        username: user.username,
        role: user.role
    });
});

app.listen(PORT, () => 
    console.log(`Server running on https://localhost:${PORT}`)
);

