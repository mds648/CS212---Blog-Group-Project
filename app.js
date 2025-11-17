function insertNavbar() {
    const navbarHTML = `
        <nav class="navbar navbar-expand-sm justify-content-center border-bottom border-black">
            <ul class="navbar-nav">
                <li class="nav-item mx-3"><a class="nav-link" href="index.html">home</a></li>
                <li class="nav-item mx-3"><a class="nav-link" href="all-posts.html">all posts</a></li>
                <li class="nav-item mx-3"><a class="nav-link" href="index.html#about-us">about us</a></li>
                <li class="nav-item mx-3"><a class="nav-link" href="sign-in.html">login</a></li>
            </ul>
            <form class="d-flex ms-3" role="search">
                <input class="form-control form-control-sm" type="search" placeholder="Search">
                <button class="btn btn-sm ms-1" type="submit">
                    <img src="./images/search.png" alt="Search" style="width:16px; height:16px;">
                </button>
            </form>
        </nav>
        `;
    document.getElementById('navbar-container').innerHTML = navbarHTML;
    // highlight active page
    const currentPage = window.location.pathname.split('/').pop();  // Get the current page's filename
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        // If the href matches the current page, add the 'active' class
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    insertNavbar();
});
