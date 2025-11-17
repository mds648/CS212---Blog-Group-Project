// import blogData functions
import { initializePosts, getPostByID } from "./blogData.js";

// func. to get the post ID from the URL
function getPostID() {
    const temp = new URLSearchParams(window.location.search);
    return temp.get('id');
}

async function renderPost() {
    const postID = getPostID();

    const dataLoaded = await initializePosts();
    if (!dataLoaded) {
        document.getElementById('postContent').innerHTML = '<h1>error: !! could not load post data !!</h1>';
        return;
    }
    const post = getPostByID(postID);
    if (post) {
        document.getElementById('blogTitle').textContent = post.title;
        document.getElementById('postAuthor').textContent = post.author;
        document.getElementById('postDate').textContent = post.date;
        document.getElementById('postContent').innerHTML = post.contents;
        document.getElementById('sidebarAuthor').textContent = `About ${post.author}`;
    } else {
        document.getElementById('postContent').innerHTML = `<h1>error: !! post "${postID}" not found !!</h1>`;
    }
}

renderPost();
