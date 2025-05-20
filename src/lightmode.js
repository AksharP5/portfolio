const savedTheme = localStorage.getItem('lightmode');
const themeToggle = document.getElementById('theme-switch');

const enableLightTheme = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
}

const disableLightTheme = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', null);
}

if (savedTheme === 'active') enableLightTheme();

themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('lightmode');
    currentTheme !== "active" ? enableLightTheme() : disableLightTheme();
});