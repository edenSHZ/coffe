document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del paquete desde localStorage
    const packageId = localStorage.getItem('selectedPackageId');
    
 

    // Obtener datos del paquete desde la BD
   fetch(`/get_paquete.php?id=${packageId}`) // Si está en la raíz
        .then(response => response.json())
        .then(paquete => {
            if (paquete.error) {
                throw new Error(paquete.error);
            }

            // Llenar los datos en el formulario
            document.getElementById('destination-input').value = `Destino: ${paquete.nombre}`;
            document.getElementById('package-id-input').value = paquete.id_paquete;
            document.getElementById('tour-description-text').textContent = paquete.descripcion;
            document.getElementById('base-price').textContent = `$${paquete.precio} USD`;
            document.getElementById('tour-image').src = paquete.imagen_principal;

            // Calcular total inicial
            updateTotalPrice(paquete.precio);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los datos del paquete.');
        });

    // Función para actualizar el precio total
    function updateTotalPrice(basePrice) {
        const personas = document.getElementById('personas-select').value;
        const total = basePrice * personas;
        document.getElementById('total-price').textContent = `$${total.toLocaleString()}`;
        document.getElementById('input-monto-total').value = total;
    }

    // Evento para calcular total cuando cambian las opciones
    document.getElementById('personas-select').addEventListener('change', function() {
        const basePrice = parseFloat(document.getElementById('base-price').textContent.replace(/[^0-9.]/g, ''));
        updateTotalPrice(basePrice);
    });
});