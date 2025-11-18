// import blogData functions
import {getAllPosts, initializePosts} from "./blogData.js";

// func. to generate the HTML for the all-posts page
function renderPostList() {
    const allPosts = getAllPosts().slice(0, 3);
    const container = document.querySelector('#recent')
    if (!container) {
        console.error("could not find the container with class '#recent'");
        return;
    }
    // clear the container
    container.innerHTML = '';
    // initialize all posts list
    allPosts.forEach(post => {
        const postLink = `post.html?id=${post.id}`;
        const postAnchor = document.createElement('a');
        postAnchor.href = postLink;
        postAnchor.className = 'post';
        postAnchor.innerHTML = `
            <h2>${post.title}<h2>
            <div class="meta">
            <p>by: ${post.author}<p>
            <p>${post.date}<p>
        `;
        container.appendChild(postAnchor);
    });
}

// func. to initialize the all-posts page
async function initializeRecentPosts() {
    const success = await initializePosts();
    if (success) {
        renderPostList();
    } else {
        document.querySelector('.posts').innerHTML = '<h1>!! failed to load posts !!</h1>'
    }
}

// initialize
initializeRecentPosts();
