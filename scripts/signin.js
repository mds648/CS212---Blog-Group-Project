const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const nameField = document.getElementById("nameField");
const title = document.getElementById("title");

signinBtn.onclick = function () {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function () {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}
document.getElementById("signinBtn").addEventListener("click", async () => {
    if (title.innerHTML !== "Sign In") return;

    const username = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!data.success) {
            alert("Invalid login");
            return;
        }
              localStorage.setItem("loggedInUser", JSON.stringify(data));
        window.location.reload();
    } catch (err) {
        console.error("Login error:", err);
        alert("Server error. Please try again.");
    }
});
