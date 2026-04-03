// Estado de autenticación
let currentUser = null;

// Función para simular inicio de sesión
function loginUser(email, password) {
    // Simulación - en producción sería una llamada a tu backend
    if (email && password) {
        currentUser = {
            id: 1,
            name: "Usuario Ejemplo",
            email: email
        };
        return true;
    }
    return false;
}

// Función para cerrar sesión
function logoutUser() {
    currentUser = null;
    return true;
}

// Función para eliminar cuenta
function deleteUserAccount() {
    if (currentUser) {
        console.log("Cuenta eliminada:", currentUser.email);
        logoutUser();
        return true;
    }
    return false;
}

// Verificar estado de autenticación
function checkAuth() {
    return currentUser;
}