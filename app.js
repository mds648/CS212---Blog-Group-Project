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

// comment section 
let comments = [];
let admin = false; 

function showComments() {
    const list = $("#comments ul");
    list.empty();

    comments.forEach((comment, index) => {
        const li = $(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="comment-text">${comment}</span>
            </li>
        `);

        // delete comment (admin only - for moderation)
        if (admin === true) {
            const deleteBtn = $(`
                <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
            `);

            deleteBtn.click(function () {
                $(this).parent().slideUp(200, function () {
                    comments.splice(index, 1);
                    showComments();
                });
            })


            li.append(deleteBtn);
        }

        list.append(li.hide().fadeIn(200));
    });
}

showComments();

// add comment with btn
$("#postCommentBtn").click(function () {
    const newComment = $("#commentInput").val();
    if (newComment !== "") {
        comments.push(newComment);
        $("#commentInput").val(""); 
        showComments();
    }
});

// 'enter' to post, 'esc' to clear
$("#commentInput").keydown(function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        $("#postCommentBtn").click();
    } else if (e.key === "Escape") {
        $(this).val("");
    }
});
