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

    updateProjectsContentHeight();
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

let marqueeAnimationId = null;
let marqueeOffset = 0;
let marqueeLastTime = 0;

function stopSkillsMarquee() {
    if (marqueeAnimationId) {
        cancelAnimationFrame(marqueeAnimationId);
        marqueeAnimationId = null;
    }
}

function startSkillsMarquee() {
    const skillsSection = document.querySelector(".skills");
    const skillsSet = document.querySelector(".skills-set");
    const skillsTrack = document.querySelector(".skills-track");

    if (!skillsSection || !skillsSet || !skillsTrack) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
        skillsTrack.style.animation = "none";
        skillsTrack.style.transform = "";
        return;
    }

    const setWidth = Math.round(skillsSet.getBoundingClientRect().width);
    if (!setWidth) {
        return;
    }

    skillsSection.style.setProperty("--skills-set-width", `${setWidth}px`);
    skillsTrack.style.animation = "none";

    const speed = setWidth / 20;
    marqueeOffset = -setWidth;
    marqueeLastTime = performance.now();

    const step = (time) => {
        const delta = (time - marqueeLastTime) / 1000;
        marqueeLastTime = time;

        marqueeOffset += speed * delta;
        if (marqueeOffset >= 0) {
            marqueeOffset -= setWidth;
        }

        skillsTrack.style.transform = `translate3d(${marqueeOffset}px, 0, 0)`;
        marqueeAnimationId = requestAnimationFrame(step);
    };

    marqueeAnimationId = requestAnimationFrame(step);
}

function updateSkillsMarqueeWidth() {
    stopSkillsMarquee();
    startSkillsMarquee();
}

function updateProjectsContentHeight() {
    const projectsContent = document.querySelector(".projects-content");

    if (!projectsContent) {
        return;
    }

    const panes = projectsContent.querySelectorAll(".project-pane");
    if (!panes.length) {
        return;
    }

    const contentWidth = Math.round(projectsContent.getBoundingClientRect().width);
    let maxHeight = 0;

    panes.forEach(pane => {
        const clone = pane.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.pointerEvents = "none";
        clone.style.opacity = "1";
        clone.style.transform = "none";
        clone.style.display = "block";
        clone.style.left = "-9999px";
        clone.style.top = "0";
        clone.style.width = `${contentWidth}px`;

        document.body.appendChild(clone);
        const height = clone.getBoundingClientRect().height;
        maxHeight = Math.max(maxHeight, height);
        document.body.removeChild(clone);
    });

    if (maxHeight > 0) {
        projectsContent.style.setProperty("--projects-content-min-height", `${Math.ceil(maxHeight)}px`);
    }
}

window.addEventListener("load", () => {
    updateSkillsMarqueeWidth();
    updateProjectsContentHeight();

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionQuery.addEventListener("change", updateSkillsMarqueeWidth);
});
window.addEventListener("resize", () => {
    updateSkillsMarqueeWidth();
    updateProjectsContentHeight();
});
