// like count 
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");
const likeImg = document.getElementById("likeImg");

// set the initial state of the button to false 
let liked = false;
// set the initial count to 0
let count = 0;

likeBtn.addEventListener("click", function(e){
    // get the opposite of the current state of the btn
    liked = !liked;
    
    // if liked
    if (liked) {
        // change the img
        likeImg.src = "./images/heart-filled.png";
        // icrement the likes count
        count++;
    }
    // if disliked
    else {
        // change the img
        likeImg.src = "./images/heart-outline.png";
        // decrement the count
        count--;
    }
    // update the count
    likeCount.textContent = count;
})