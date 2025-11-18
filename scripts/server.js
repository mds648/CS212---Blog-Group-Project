const express = require("express");
const fs = require("fs");
const path = require('path');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(3000, () => console.log("Server running on port 3000"));

