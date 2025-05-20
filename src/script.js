const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.onscroll = () => {
    sections.forEach(section => {
        const scrollPosition = window.scrollY;
        const sectionOffset = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                document.querySelector(`.navbar a[href*=${sectionId}]`).classList.add("active");
            });
        }
    });
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}

navLinks.forEach(link => {
    link.onclick = () => {
        navLinks.forEach(navLink => navLink.classList.remove("active"));
        link.classList.add("active");
        navbar.classList.remove("active");
        menuIcon.classList.remove("bx-x");
    };
});