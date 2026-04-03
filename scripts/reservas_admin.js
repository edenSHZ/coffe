document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const reservasTableBody = document.getElementById('reservasTableBody');
    const refreshReservasBtn = document.getElementById('refreshReservasBtn');
    const filtroEstado = document.getElementById('filtroEstado');
    const filtroFecha = document.getElementById('filtroFecha');
    const aplicarFiltroBtn = document.getElementById('aplicarFiltroBtn');
    const reservaModal = document.getElementById('reservaModal');
    const closeModal = document.querySelector('.close-modal');
    const modalReservaContent = document.getElementById('modalReservaContent');
    const confirmarReservaBtn = document.getElementById('confirmarReservaBtn');
    const cancelarReservaBtn = document.getElementById('cancelarReservaBtn');
    const completarReservaBtn = document.getElementById('completarReservaBtn');
    
    let currentReservaId = null;
    
    // Cargar reservas al iniciar
    cargarReservas();
    
    // Event listeners
    refreshReservasBtn.addEventListener('click', cargarReservas);
    aplicarFiltroBtn.addEventListener('click', aplicarFiltros);
    closeModal.addEventListener('click', () => reservaModal.style.display = 'none');
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === reservaModal) {
            reservaModal.style.display = 'none';
        }
    });
    
    // Función para cargar reservas
    function cargarReservas() {
        fetch('get_reservas.php')
            .then(response => response.json())
            .then(data => {
                mostrarReservas(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar las reservas');
            });
    }
    
    // Función para aplicar filtros
    function aplicarFiltros() {
        const estado = filtroEstado.value;
        const fecha = filtroFecha.value;
        
        let url = 'get_reservas.php?';
        if (estado !== 'todos') url += `estado=${estado}&`;
        if (fecha) url += `fecha=${fecha}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarReservas(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al filtrar las reservas');
            });
    }
    
    // Función para mostrar reservas en la tabla
    function mostrarReservas(reservas) {
        reservasTableBody.innerHTML = '';
        
        if (reservas.length === 0 || reservas.error) {
            reservasTableBody.innerHTML = '<tr><td colspan="8">No hay reservas encontradas</td></tr>';
            return;
        }
        
        reservas.forEach(reserva => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reserva.id_reserva}</td>
                <td>${reserva.nombre_usuario} (ID: ${reserva.id_usuario})</td>
                <td>${reserva.nombre_paquete} (ID: ${reserva.id_paquete})</td>
                <td>${formatearFecha(reserva.fecha_reserva)}</td>
                <td>${reserva.cantidad_personas}</td>
                <td>$${reserva.monto_total.toFixed(2)}</td>
                <td><span class="estado-badge ${reserva.estado_pago}">${reserva.estado_pago}</span></td>
                <td>
                    <button class="btn btn-info btn-sm ver-detalle" data-id="${reserva.id_reserva}">Ver</button>
                </td>
            `;
            reservasTableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones de ver detalle
        document.querySelectorAll('.ver-detalle').forEach(btn => {
            btn.addEventListener('click', function() {
                const reservaId = this.getAttribute('data-id');
                mostrarDetalleReserva(reservaId);
            });
        });
    }
    
    // Función para mostrar detalles de una reserva
    function mostrarDetalleReserva(reservaId) {
        fetch(`get_reserva.php?id=${reservaId}`)
            .then(response => response.json())
            .then(reserva => {
                currentReservaId = reserva.id_reserva;
                
                modalReservaContent.innerHTML = `
                    <div class="reserva-info">
                        <p><strong>ID Reserva:</strong> ${reserva.id_reserva}</p>
                        <p><strong>Usuario:</strong> ${reserva.nombre_usuario} (ID: ${reserva.id_usuario})</p>
                        <p><strong>Email:</strong> ${reserva.email_usuario}</p>
                        <p><strong>Paquete:</strong> ${reserva.nombre_paquete} (ID: ${reserva.id_paquete})</p>
                        <p><strong>Fecha Reserva:</strong> ${formatearFecha(reserva.fecha_reserva)}</p>
                        <p><strong>Fecha Viaje:</strong> ${formatearFecha(reserva.fecha_viaje)}</p>
                        <p><strong>Número de Personas:</strong> ${reserva.cantidad_personas}</p>
                        <p><strong>Total:</strong> $${reserva.monto_total.toFixed(2)}</p>
                        <p><strong>Estado:</strong> <span class="estado-badge ${reserva.estado_pago}">${reserva.estado_pago}</span></p>
                        <p><strong>Método de Pago:</strong> ${reserva.metodo_pago}</p>
                    </div>
                `;
                
                // Mostrar/ocultar botones según el estado
                confirmarReservaBtn.style.display = reserva.estado_pago === 'pendiente' ? 'block' : 'none';
                cancelarReservaBtn.style.display = reserva.estado_pago !== 'cancelado' ? 'block' : 'none';
                completarReservaBtn.style.display = reserva.estado_pago === 'pagado' ? 'block' : 'none';
                
                reservaModal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar los detalles de la reserva');
            });
    }
    
    // Event listeners para los botones de acción
    confirmarReservaBtn.addEventListener('click', () => cambiarEstadoReserva('pagado'));
    cancelarReservaBtn.addEventListener('click', () => cambiarEstadoReserva('cancelado'));
    completarReservaBtn.addEventListener('click', () => cambiarEstadoReserva('completado'));
    
    // Función para cambiar el estado de una reserva
    function cambiarEstadoReserva(nuevoEstado) {
        if (!currentReservaId) return;
        
        fetch('update_reserva.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_reserva: currentReservaId,
                estado_pago: nuevoEstado
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Reserva actualizada a ${nuevoEstado} con éxito`);
                reservaModal.style.display = 'none';
                cargarReservas();
            } else {
                alert('Error al actualizar la reserva: ' + (data.message || ''));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar la reserva');
        });
    }
    
    // Función auxiliar para formatear fechas
    function formatearFecha(fechaStr) {
        if (!fechaStr) return 'No especificada';
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-MX', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});