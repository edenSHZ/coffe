document.addEventListener('DOMContentLoaded', function() {
    // Cargar usuarios al abrir la pestaña
    document.querySelector('[data-tab="usuarios"]').addEventListener('click', loadUsers);
    
    // Botón de actualizar
    document.getElementById('refreshUsersBtn').addEventListener('click', loadUsers);
    
    // Función para cargar usuarios
    async function loadUsers() {
        try {
            const response = await fetch('get_users.php');
            const users = await response.json();
            
            const tableBody = document.getElementById('usersTableBody');
            tableBody.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.id_usuario}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.tipo}</td>
                    <td>${new Date(user.fecha_registro).toLocaleDateString()}</td>
                    <td><button class="btn-delete" data-id="${user.id_usuario}">Eliminar</button></td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Agregar event listeners a los botones de eliminar
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', deleteUser);
            });
            
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            alert('Error al cargar usuarios');
        }
    }
    
    // Función para eliminar usuario
    async function deleteUser(event) {
        const userId = event.target.getAttribute('data-id');
        
        if (!confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${userId}?`)) {
            return;
        }
        
        try {
            const response = await fetch('delete_users.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario: userId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Usuario eliminado correctamente');
                loadUsers();
            } else {
                alert('Error al eliminar usuario: ' + result.message);
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario');
        }
    }
});