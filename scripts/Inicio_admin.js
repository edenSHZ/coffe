
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validación básica
    if (!username || !password) {
        document.getElementById('error-message').textContent = 'Por favor completa todos los campos';
        document.getElementById('error-message').style.display = 'block';
        return;
    }
    
    // Enviar el formulario
    this.submit();
});
