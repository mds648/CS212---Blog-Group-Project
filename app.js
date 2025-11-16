// highlight active link in navbar
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    const currentUrl = window.location.href; // current url
    links.forEach(link => {
        console.log(link.href, currentUrl);
        if (link.href === currentUrl) {
            link.classList.add('nav-active');
        }
    });
});
