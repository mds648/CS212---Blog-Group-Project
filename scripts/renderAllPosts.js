// import blogData functions
import { initializePosts, getAllPosts } from "./blogData.js";

// func. to generate the HTML for the all-posts page
function renderPostList() {
    const allPosts = getAllPosts();
    const container = document.querySelector('#posts')
    if (!container) {
        console.error("could not find the container with class '#posts'");
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
async function initializeAllPosts() {
    const success = await initializePosts();
    if (success) {
        renderPostList();
    } else {
        document.querySelector('.posts').innerHTML = '<h1>!! failed to load posts !!</h1>'
    }
}

// initialize
initializeAllPosts();
