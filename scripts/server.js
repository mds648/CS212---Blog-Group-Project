const express = require("express");
const fs = require("fs");
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = 3000;
const BLOGS_FILE_PATH = path.join(__dirname, '..', 'blogs.json');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));

// API endpoint to increment the like count for a blog post 
app.post('/api/like/:id', async (req, res) => {
    // initialize post ID
    const postID = req.params.id;
    try {
        // read contents of blogs.json
        const data = await fs.promises.readFile(BLOGS_FILE_PATH, 'utf8');
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
        await fs.promises.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 4), 'utf8');
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

// API endpoint to decrement the like count for a blog post 
app.post('/api/unlike/:id', async (req, res) => {
    // initialize post ID
    const postID = req.params.id;
    try {
        // read contents of blogs.json
        const data = await fs.promises.readFile(BLOGS_FILE_PATH, 'utf8');
        let posts = JSON.parse(data);

        // find post by ID
        const postIndex = posts.findIndex(p => p.id === postID);
        if (postIndex === -1) {
            return res.status(404).json({ 
                error: 'Post not found'
            });
        }

        // decrement the global like count -- ensure it does not drop below zero
        posts[postIndex].likes = Math.max(0, (posts[postIndex].likes || 0) - 1);
        const newLikeCount = posts[postIndex].likes;

        // write array into blogs.json file
        await fs.promises.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 4), 'utf8');
        console.log(`Post ${postID} unliked. New like count: ${newLikeCount}`);
        
        // send the global count to client
        res.json({ 
            success: true, newLikeCount: newLikeCount 
        });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ 
            error: 'Failed to update post data on server!' 
        });
    }
});

// API endpoint to save new comments to blogs.json
app.post('/api/comment/:id', async (req, res) => {
    // get the ID from URL
    const postID = req.params.id;
    // get the new comment from the request
    const newComment = req.body.comment;
    // validate
    if (!newComment) {
        return res.status(400).json({ error: 'Comment text is required' });
    }

    try {
        // read contents of blog.json
        const data = await fs.promises.readFile(BLOGS_FILE_PATH, 'utf8');
        let posts = JSON.parse(data);

        // find post by ID
        const postIndex = posts.findIndex(p => p.id === postID);
        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // initialize comments array if it does not exist
        if (!posts[postIndex].comments) {
            posts[postIndex].comments = [];
        }
        
        // push the new comment into the array
        posts[postIndex].comments.push(newComment);

        // write the updated array to blogs.json
        await fs.promises.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 4), 'utf8');
        console.log(`New comment added to post ${postID}: "${newComment}"`);

        // success response
        res.status(201).json({
            success: true,
            message: 'Comment successfully saved.',
            newComment: newComment
        })
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({
            error: 'Failed to save comment data on server!'
        })
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
    console.log(`Server running on http://localhost:${PORT}`)
);

