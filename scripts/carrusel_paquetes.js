document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar paquetes en el carrusel
    async function loadPackagesToCarousel() {
        try {
            const response = await fetch('get_packages.php');
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const packages = await response.json();
            const carouselTrack = document.getElementById('paquetesCarousel');
            
            carouselTrack.innerHTML = '';
            
            if (!packages || packages.length === 0) {
                carouselTrack.innerHTML = '<p class="no-packages">No hay paquetes disponibles</p>';
                return;
            }
            
            packages.forEach(pkg => {
                const packageSlide = document.createElement('div');
                packageSlide.className = 'carousel-slide';
                packageSlide.dataset.packageId = pkg.id_paquete;
                
                packageSlide.innerHTML = `
                    <img src="${pkg.imagen_principal || 'imagenes/default.jpg'}" 
                        alt="${pkg.nombre || 'Paquete turístico'}"
                        class="carousel-image">
                    <div class="slide-content">
                        <h3>${pkg.nombre || 'Paquete sin nombre'}</h3>
                        <div class="slide-buttons">
                            <button class="slide-btn view-btn" 
                                    data-package-id="${pkg.id_paquete}">
                                Ver
                            </button>
                            <button class="slide-btn quote-btn" 
                                    data-package-id="${pkg.id_paquete}">
                                Cotizar
                            </button>
                        </div>
                    </div>
                `;
                
                carouselTrack.appendChild(packageSlide);
            });
            
            // Inicializar el carrusel después de cargar los paquetes
            initCarousel();
            
            // Agregar eventos a los botones
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const packageId = this.dataset.packageId;
                    window.location.href = `detalle_paquete.html?id=${packageId}`;
                });
            });
            
            document.querySelectorAll('.quote-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const packageId = this.dataset.packageId;
                    window.location.href = `reservar.html?id=${packageId}`;
                });
            });
            
        } catch (error) {
            console.error('Error al cargar paquetes:', error);
            document.getElementById('paquetesCarousel').innerHTML = `
                <p class="error-message">Error al cargar paquetes: ${error.message}</p>
            `;
        }
    }
    
    // Función para inicializar el carrusel
    function initCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // Colocar las slides una al lado de la otra
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
        
        // Mover al slide objetivo
        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide.style.left})`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };
        
        // Click en botón derecho
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            
            moveToSlide(track, currentSlide, nextSlide);
        });
        
        // Click en botón izquierdo
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
            
            moveToSlide(track, currentSlide, prevSlide);
        });
        
        // Establecer la primera slide como activa
        slides[0].classList.add('current-slide');
    }
    
    // Cargar los paquetes cuando la página esté lista
    loadPackagesToCarousel();
});