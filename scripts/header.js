function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    const btn = document.querySelector('.language-btn');
    const icon = btn.querySelector('.dropdown-icon');

    menu.classList.toggle('show');

    // Rotar el ícono cuando el menú está abierto
    if (menu.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0)';
    }
}

// Cerrar el menú cuando se hace clic fuera de él
document.addEventListener('click', function(event) {
    const menu = document.getElementById('languageMenu');
    const btn = document.querySelector('.language-btn');

    if (!btn.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
        btn.querySelector('.dropdown-icon').style.transform = 'rotate(0)';
    }
});