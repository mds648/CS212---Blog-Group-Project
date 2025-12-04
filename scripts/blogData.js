// initialize variables
    // var. to store the fetched blog post data
let allBlogPosts = [];
    // 'macro' to store the json file path
const JSON_PATH = 'blogs.json';

async function initializePosts() {
    try {
        console.log(`fetching data from ${JSON_PATH}`);
        // uses the fetch API to get the .json file
        const response = await fetch(JSON_PATH);
        // checks if the fetch was successful
        if (!response.ok) {
            throw new Error(`fetch error! Status: ${response.status}`);
        }
        // parse the response as json data
        const data = await response.json();
        allBlogPosts = data;
        // log success message
        console.log('blog posts loaded successfully!');
        return true;
    } catch (error) {
        console.error('could not fetch post data:', error);
        allBlogPosts = [];
        return false;
    }
}

function getPostByID(id) {
    // returns the post with the matching ID
    // specific fields can be retrieved by using: 
    //      getPostByID(id).field
    return allBlogPosts.find(post => post.id === id);
}


function getAllPosts() {
    // retrieves every blog post for use in other files
    return allBlogPosts;
}

// functions needed by other files
export {
    initializePosts,
    getAllPosts,
    getPostByID
};
