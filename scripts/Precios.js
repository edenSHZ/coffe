document.addEventListener("DOMContentLoaded", function() {
    const durationSelect = document.querySelector('.booking-form .form-group:nth-of-type(2) select');
    const peopleSelect = document.querySelector('.booking-form .form-group:nth-of-type(3) select');
    const totalPriceElement = document.querySelector('.booking-form .total-price .price');

    // Precio base por noche por persona
    const pricePerNight = 1500;
    
    // Mapeo de noches según duración
    const nightMultiplier = {
        "6 días, 5 noches": 5,
        "7 días, 7 noches": 7,
        "8 días, 7 noches": 7,
        "9 días, 8 noches": 8,
        "10 días, 9 noches": 9
    };

    function updateTotalPrice() {
        // Obtener texto de la opción seleccionada (ej: "6 días, 5 noches")
        const selectedDuration = durationSelect.options[durationSelect.selectedIndex].text;
        
        // Extraer el número de personas (ej: "3 personas" → 3)
        const selectedPeople = parseInt(peopleSelect.options[peopleSelect.selectedIndex].text.match(/\d+/)[0]);
        
        // Calcular noches y total
        const nights = nightMultiplier[selectedDuration];
        const total = nights * pricePerNight * selectedPeople;
        
        // Actualizar el HTML con el formato correcto (ej: $22,500)
        totalPriceElement.textContent = `$${total.toLocaleString('es-MX')}`;
    }

    // Escuchar cambios en los selects
    durationSelect.addEventListener('change', updateTotalPrice);
    peopleSelect.addEventListener('change', updateTotalPrice);
    
    // Calcular precio inicial al cargar
    updateTotalPrice();
});