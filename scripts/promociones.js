document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('promocionesTrack');
    const prevBtn = document.querySelector('.prev-promo');
    const nextBtn = document.querySelector('.next-promo');
    let currentPosition = 0;
    const cardWidth = 300;

    // Función original para formatear precios
   const formatPrice = (price) => {
    // Convertir el precio a número por si viene como string
    const numericPrice = typeof price === 'string' ? 
        parseFloat(price.replace(/[^0-9.]/g, '')) : 
        Number(price);
    
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(numericPrice);
};
    // Función original para crear tarjetas (SIN CAMBIOS)
    const createPromoCard = (paquete) => {
        const card = document.createElement('div');
        card.className = 'promo-card';
        card.innerHTML = `
            <div class="promo-header">
                <h3>${paquete.nombre.split(' ')[0].toUpperCase()}</h3>
                <p>${paquete.descripcion.substring(0, 60)}...</p>
            </div>
            <div class="promo-image">
                <img src="${paquete.imagen_principal}" alt="${paquete.nombre}" onerror="this.src='imagenes/default.jpg'">
            </div>
            <div class="promo-details">
                <div class="promo-date">
                    <span>${paquete.fecha_formateada}</span>
                </div>
                <div class="promo-price">
                    <span class="price">${formatPrice(paquete.precio)}</span>
                </div>
            </div>
            <button class="reservar-btn" data-id="${paquete.id_paquete}">Reservar</button>
        `;
        return card;
    };

    // Función original para cargar paquetes (SIN CAMBIOS en la visualización)
    const loadPaquetes = async () => {
        try {
            track.innerHTML = '<div class="loading">Cargando promociones...</div>';
            
            const response = await fetch('get_promociones.php');
            const data = await response.json();

            if (data.error) {
                track.innerHTML = `<div class="error">${data.error}</div>`;
                return;
            }

            track.innerHTML = '';
            data.forEach(paquete => {
                const card = createPromoCard(paquete);
                track.appendChild(card);
            });

            /* ====== ÚNICO CAMBIO: MEJORA EN BOTÓN RESERVAR ====== */
            document.querySelectorAll('.reservar-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const idPaquete = this.getAttribute('data-id');
                    
                    // 1. Almacenamiento en localStorage como respaldo
                    localStorage.setItem('selectedPackageId', idPaquete);
                    
                    // 2. Redirección con parámetro URL
                    window.location.href = `reservar.html?id=${idPaquete}`;
                    
                    // 3. Opcional: Cookie como segundo respaldo
                    document.cookie = `currentPackage=${idPaquete}; path=/; max-age=300`;
                });
            });

        } catch (error) {
            track.innerHTML = `<div class="error">Error al cargar promociones: ${error.message}</div>`;
            console.error('Error:', error);
        }
    };

    // Navegación del carrusel (SIN CAMBIOS)
    prevBtn.addEventListener('click', () => {
        currentPosition = Math.min(currentPosition + cardWidth, 0);
        track.style.transform = `translateX(${currentPosition}px)`;
    });

    nextBtn.addEventListener('click', () => {
        const maxScroll = -(track.scrollWidth - track.clientWidth);
        currentPosition = Math.max(currentPosition - cardWidth, maxScroll);
        track.style.transform = `translateX(${currentPosition}px)`;
    });

    // Inicialización (SIN CAMBIOS)
    loadPaquetes();
});