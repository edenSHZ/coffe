document.addEventListener('DOMContentLoaded', function() {
    // Manejar cambio de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuLinks = document.querySelectorAll('.admin-menu a');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Cambiar estado activo de los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar contenido correspondiente
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
            
            // Cambiar estado activo del menú lateral
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-tab') === tabId) {
                    link.classList.add('active');
                }
            });
        });
    });
    
    // Manejar enlaces del menú lateral
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            
            // Cambiar estado activo del menú
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Cambiar pestaña
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-tab') === tabId) {
                    btn.classList.add('active');
                }
            });
            
            // Mostrar contenido correspondiente
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Manejar cierre de sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            // Aquí deberías hacer una llamada al servidor para cerrar sesión
            // y luego redirigir al usuario
            window.location.href = 'inicio_sesion.html';
        }
    });
});