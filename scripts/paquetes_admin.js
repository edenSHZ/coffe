document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const addPackageBtn = document.getElementById('addPackageBtn');
    const packageForm = document.getElementById('paqueteForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const formContainer = document.getElementById('packageFormContainer');
    const formTitle = document.getElementById('formTitle');
    const paquetesGrid = document.getElementById('paquetesGrid');
    
    // Variables de estado
    let isEditing = false;
    let currentPackageId = null;
    
    // Cargar paquetes al iniciar
    loadPackages();
    
    // Evento para mostrar formulario de nuevo paquete
    addPackageBtn.addEventListener('click', () => {
        isEditing = false;
        currentPackageId = null;
        formTitle.textContent = 'Agregar Nuevo Paquete';
        packageForm.reset();
        document.getElementById('imgPreview').src = '';
        formContainer.style.display = 'block';
    });
    
    // Evento para cancelar formulario
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });
    
    // Vista previa de imagen
    document.getElementById('imagen_principal').addEventListener('input', function() {
        document.getElementById('imgPreview').src = this.value;
    });
    
    // Manejar envío del formulario
    packageForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: parseFloat(document.getElementById('precio').value),
            imagen_principal: document.getElementById('imagen_principal').value,
            fecha_inicio: document.getElementById('fecha_inicio').value,
            fecha_fin: document.getElementById('fecha_fin').value,
            id_admin: 11 // Asumiendo que el admin con ID 11 está logueado
        };
        
        if (isEditing) {
            formData.id_paquete = currentPackageId;
            await updatePackage(formData);
        } else {
            await createPackage(formData);
        }
    });
    
    // Función para cargar paquetes
    async function loadPackages() {
        try {
            const response = await fetch('get_packages.php');
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const packages = await response.json();
            
            paquetesGrid.innerHTML = '';
            
            if (!packages || packages.length === 0) {
                paquetesGrid.innerHTML = '<p class="no-packages">No hay paquetes disponibles</p>';
                return;
            }
            
            packages.forEach(pkg => {
                const precio = typeof pkg.precio === 'number' ? pkg.precio : parseFloat(pkg.precio);
                const precioFormateado = !isNaN(precio) ? precio.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 2
                }) : '$0.00 MXN';
                
                const packageCard = document.createElement('div');
                packageCard.className = 'package-card';
                
                packageCard.innerHTML = `
                    <div class="package-image-container">
                        <img src="${pkg.imagen_principal || 'imagenes/default.jpg'}" 
                             alt="${pkg.nombre}" 
                             class="package-thumbnail">
                    </div>
                    <div class="package-info">
                        <h3>${pkg.nombre || 'Sin nombre'}</h3>
                        <p class="package-description">${pkg.descripcion ? pkg.descripcion.substring(0, 100) + (pkg.descripcion.length > 100 ? '...' : '') : 'Sin descripción'}</p>
                        <p class="package-price"><strong>Precio:</strong> ${precioFormateado}</p>
                        <p class="package-dates"><strong>Fechas:</strong> ${formatDate(pkg.fecha_inicio)} - ${formatDate(pkg.fecha_fin)}</p>
                        <div class="package-actions">
                            <button class="btn-edit" data-id="${pkg.id_paquete}">Editar</button>
                            <button class="btn-delete" data-id="${pkg.id_paquete}">Eliminar</button>
                        </div>
                    </div>
                `;
                
                paquetesGrid.appendChild(packageCard);
            });
            
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', editPackage);
            });
            
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', deletePackage);
            });
            
        } catch (error) {
            console.error('Error al cargar paquetes:', error);
            paquetesGrid.innerHTML = `
                <p class="error-message">Error al cargar paquetes: ${error.message}</p>
            `;
        }
    }
    
    // Función para formatear fechas
    function formatDate(dateString) {
        if (!dateString) return 'Sin fecha';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Fecha inválida';
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }
    
    // Función para editar paquete
   async function editPackage(event) {
    const packageId = event.target.getAttribute('data-id');
    
    try {
        const response = await fetch(`paquetes.php?id=${packageId}`);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.package) {
            const pkg = data.package;
            
            // Llenar el formulario con los datos del paquete
            document.getElementById('nombre').value = pkg.nombre || '';
            document.getElementById('descripcion').value = pkg.descripcion || '';
            document.getElementById('precio').value = pkg.precio || '';
            document.getElementById('imagen_principal').value = pkg.imagen_principal || '';
            document.getElementById('imgPreview').src = pkg.imagen_principal || '';
            document.getElementById('fecha_inicio').value = pkg.fecha_inicio || '';
            document.getElementById('fecha_fin').value = pkg.fecha_fin || '';
            
            // Mostrar el formulario
            document.getElementById('packageFormContainer').style.display = 'block';
            document.getElementById('formTitle').textContent = 'Editar Paquete';
            
            // Configurar variables de estado
            isEditing = true;
            currentPackageId = packageId;
            
        } else {
            throw new Error(data.message || 'Paquete no encontrado');
        }
        
    } catch (error) {
        console.error('Error al cargar paquete para editar:', error);
        alert('Error al cargar paquete para editar: ' + error.message);
    }
}
    
    // Función para crear paquete
    async function createPackage(formData) {
        try {
            const response = await fetch('create_package.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Paquete creado correctamente');
                formContainer.style.display = 'none';
                loadPackages();
            } else {
                throw new Error(result.message || 'Error al crear paquete');
            }
        } catch (error) {
            console.error('Error al crear paquete:', error);
            alert('Error al crear paquete: ' + error.message);
        }
    }
    
    // Función para actualizar paquete
    async function updatePackage(formData) {
        try {
            const response = await fetch('update_package.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Paquete actualizado correctamente');
                formContainer.style.display = 'none';
                loadPackages();
            } else {
                throw new Error(result.message || 'Error al actualizar paquete');
            }
        } catch (error) {
            console.error('Error al actualizar paquete:', error);
            alert('Error al actualizar paquete: ' + error.message);
        }
    }
    
    // Función para eliminar paquete
    async function deletePackage(event) {
        const packageId = event.target.getAttribute('data-id');
        
        if (!confirm('¿Estás seguro de que deseas eliminar este paquete permanentemente?')) {
            return;
        }
        
        try {
            const response = await fetch('delete_package.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_paquete: packageId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Paquete eliminado correctamente');
                loadPackages();
            } else {
                throw new Error(result.message || 'Error al eliminar paquete');
            }
        } catch (error) {
            console.error('Error al eliminar paquete:', error);
            alert('Error al eliminar paquete: ' + error.message);
        }
    }
});