document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth;

    // Configuración del carrusel automático
    const autoSlideInterval = 5000; // 5 segundos entre slides
    let autoSlideTimer;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    // Iniciar carrusel automático
    function startAutoSlide() {
        autoSlideTimer = setInterval(moveToNextSlide, autoSlideInterval);
    }

    // Detener carrusel automático
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        moveToPrevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        moveToNextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Iniciar el carrusel automático
    startAutoSlide();
});

// Carrusel de promociones
function initPromoCarousel() {
    const promoTrack = document.querySelector('.promociones-track');
    const promoSlides = document.querySelectorAll('.promo-slide');
    const prevPromo = document.querySelector('.prev-promo');
    const nextPromo = document.querySelector('.next-promo');

    let promoIndex = 0;
    const slidesToShow = 4;
    const totalGroups = Math.ceil(promoSlides.length / slidesToShow);

    function movePromoSlide() {
        const offset = (promoIndex * 100) / slidesToShow;
        promoTrack.style.transform = `translateX(-${offset}%)`;
    }

    function nextPromoSlide() {
        promoIndex = (promoIndex + 1) % totalGroups;
        movePromoSlide();
    }

    function prevPromoSlide() {
        promoIndex = (promoIndex - 1 + totalGroups) % totalGroups;
        movePromoSlide();
    }

    // Auto-play cada 6 segundos
    const autoPlayInterval = setInterval(nextPromoSlide, 6000);

    // Event listeners para los botones
    prevPromo.addEventListener('click', () => {
        prevPromoSlide();
        clearInterval(autoPlayInterval);
    });

    nextPromo.addEventListener('click', () => {
        nextPromoSlide();
        clearInterval(autoPlayInterval);
    });
}

document.addEventListener('DOMContentLoaded', initPromoCarousel);

// Mostrar/ocultar menú de usuario
document.getElementById('userBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('show');
});

// Ocultar menú al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu-container')) {
        const menu = document.getElementById('userMenu');
        menu.classList.remove('show');
    }
});