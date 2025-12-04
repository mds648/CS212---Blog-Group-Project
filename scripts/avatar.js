window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const avatarContainer = document.getElementById("user-avatar");
    const avatarImg = document.getElementById("avatar-img");

    if (user) {
        avatarImg.src = user.photo || "default-avatar.png";
        avatarContainer.style.display = "block";
    }

    avatarContainer.addEventListener("click", () => {
        const confirmLogout = confirm("Logout?");
        if (confirmLogout) {
            localStorage.removeItem("loggedInUser");
            window.location.reload();
        }
    });
});
