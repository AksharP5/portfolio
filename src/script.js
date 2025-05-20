const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

function switchTab(tabId, section) {
    const tabButtons = section.querySelectorAll('.tab-btn');
    const tabPanes = section.querySelectorAll('.tab-pane');
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedPane = document.getElementById(tabId);
    const selectedButton = section.querySelector(`[data-tab="${tabId}"]`);
    
    if (selectedPane && selectedButton) {
        selectedPane.classList.add('active');
        selectedButton.classList.add('active');
    }
}

function switchProject(projectId, section) {
    const projectButtons = section.querySelectorAll('.project-nav-btn');
    const projectPanes = section.querySelectorAll('.project-pane');
    
    projectPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    projectButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedPane = document.getElementById(projectId);
    const selectedButton = section.querySelector(`[data-project="${projectId}"]`);
    
    if (selectedPane && selectedButton) {
        selectedPane.classList.add('active');
        selectedButton.classList.add('active');
    }
}

const experienceSection = document.querySelector('.experience-tabs');
if (experienceSection) {
    const experienceTabButtons = experienceSection.querySelectorAll('.tab-btn');
    experienceTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId, experienceSection);
        });
    });
    
    const firstExperienceTab = experienceTabButtons[0];
    if (firstExperienceTab) {
        const tabId = firstExperienceTab.getAttribute('data-tab');
        switchTab(tabId, experienceSection);
    }
}

const projectsSection = document.querySelector('.projects-container');
if (projectsSection) {
    const projectButtons = projectsSection.querySelectorAll('.project-nav-btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            switchProject(projectId, projectsSection);
        });
    });
    
    const firstProjectTab = projectButtons[0];
    if (firstProjectTab) {
        const projectId = firstProjectTab.getAttribute('data-project');
        switchProject(projectId, projectsSection);
    }
}

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