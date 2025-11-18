// import blogData functions
import {getPostByID, initializePosts} from "./blogData.js";

// func. to get the post ID from the URL
function getPostID() {
    const temp = new URLSearchParams(window.location.search);
    return temp.get('id');
}

// get author data from admins.json
async function getAuthorData(authorName) {
    try {
        const response = await fetch('admins.json');
        const admins = await response.json();
        return admins.find(admin => admin.name === authorName) || null;
    } catch (error) {
        console.error('Error loading author data:', error);
        return null;
    }
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
        // render post content
        document.getElementById('blogTitle').textContent = post.title;
        document.getElementById('postAuthor').textContent = post.author;
        document.getElementById('postDate').textContent = post.date;
        document.getElementById('postContent').innerHTML = post.contents;

        // render author data
        const authorData = await getAuthorData(post.author);
        if (authorData) {
            document.getElementById('sidebarAuthor').textContent = `About ${authorData.name}`;
            const sidebarBio = document.querySelector('#post-sidebar .mb-4 p');
            sidebarBio.textContent = authorData.bio;

            // contact info
            const contactList = document.querySelector('#post-sidebar .mb-4 ul');
            contactList.innerHTML = '';
            const emailItem = document.createElement('li');
            emailItem.innerHTML = `Email: <a href="mailto:${authorData.email}">${authorData.email}</a>`;
            contactList.appendChild(emailItem);

            // photo
            const sidebarImage = document.createElement('img');
            sidebarImage.src = authorData.photo;
            sidebarImage.alt = `Photo of ${authorData.name}`;
            sidebarImage.classList.add('img-fluid', 'rounded-circle', 'mb-3');
            const sidebarImageContainer = document.createElement('div');
            sidebarImageContainer.classList.add('text-center');
            sidebarImageContainer.appendChild(sidebarImage);
            const sidebarAuthorDiv = document.querySelector('#post-sidebar .mb-4');
            sidebarAuthorDiv.insertBefore(sidebarImageContainer, sidebarBio);
        } else {
            document.getElementById('sidebarAuthor').textContent = "About the Author (No Data Available)";
        }
    } else {
        document.getElementById('postContent').innerHTML = `<h1>error: !! post "${postID}" not found !!</h1>`;
    }
}

renderPost();
