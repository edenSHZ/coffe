function initUserMenu() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    // Actualizar contenido del menú
    function updateUserMenu() {
        const user = checkAuth();
        
        if (user) {
            // Usuario logueado
            userDropdown.innerHTML = `
                <div class="user-info">
                    ${user.name}
                    <div style="font-size:12px;color:#777;">${user.email}</div>
                </div>
                <button class="user-dropdown-option" onclick="handleChangeAccount()">
                    Cambiar de cuenta
                </button>
                <button class="user-dropdown-option option-danger" onclick="handleDeleteAccount()">
                    Eliminar cuenta
                </button>
                <button class="user-dropdown-option" onclick="handleLogout()">
                    Cerrar sesión
                </button>
            `;
        } else {
            // Usuario no logueado
            userDropdown.innerHTML = `
                <button class="user-dropdown-option" onclick="handleLogin()">
                    Iniciar sesión
                </button>
            `;
        }
    }
    
    // Mostrar/ocultar menú
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        updateUserMenu();
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function() {
        userDropdown.style.display = 'none';
    });
    
    // Funciones globales para manejar acciones
    window.handleLogin = function() {
        const email = prompt('Ingresa tu email:');
        if (email) {
            const password = prompt('Ingresa tu contraseña:');
            if (password) {
                if (loginUser(email, password)) {
                    updateUserMenu();
                    alert(`Bienvenido, ${currentUser.name}!`);
                } else {
                    alert('Credenciales incorrectas');
                }
            }
        }
    };
    
    window.handleLogout = function() {
        if (logoutUser()) {
            updateUserMenu();
            alert('Has cerrado sesión correctamente');
        }
    };
    
    window.handleDeleteAccount = function() {
        if (confirm('¿Estás seguro de que quieres ELIMINAR tu cuenta permanentemente?')) {
            if (deleteUserAccount()) {
                updateUserMenu();
                alert('Tu cuenta ha sido eliminada');
            }
        }
    };
    
    window.handleChangeAccount = function() {
        handleLogout();
        handleLogin();
    };
    
    // Inicializar el menú
    updateUserMenu();
}