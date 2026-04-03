// Datos de los paquetes
const packagesData = {
    "europa": {
        "id": "europa",
        "destino": "Europa: París, Roma y Barcelona",
        "imagen": "imagenes/italia.jpg",
        "descripcion": "Tour por las ciudades más emblemáticas de Europa. Visita la Torre Eiffel, el Coliseo Romano y la Sagrada Familia en este viaje inolvidable que combina historia, cultura y gastronomía.",
        "precioBase": 38500,
        "duraciones": [
            {"value": "10d9n", "text": "10 días, 9 noches", "noches": 9, "precio": 38500},
            {"value": "12d11n", "text": "12 días, 11 noches", "noches": 11, "precio": 46200},
            {"value": "15d14n", "text": "15 días, 14 noches", "noches": 14, "precio": 53900}
        ],
        "itinerario": [
            "Días 1-3: París - Torre Eiffel, Louvre y Notre Dame",
            "Días 4-7: Roma - Coliseo, Vaticano y Fontana di Trevi",
            "Días 8-10: Barcelona - Sagrada Familia y Parque Güell",
            "Día 11: Regreso"
        ],
        "incluye": [
            "Vuelos redondos en clase turista",
            "Alojamiento en hoteles 4 estrellas",
            "Desayunos diarios",
            "Tours guiados en cada ciudad",
            "Transporte entre ciudades"
        ]
    },
    "nickelodeon": {
        "id": "nickelodeon",
        "destino": "Hotel Nickelodeon Riviera Maya",
        "imagen": "imagenes/nick1.jpg",
        "descripcion": "Vacaciones familiares inolvidables en el resort todo incluido de Nickelodeon. Interacción con personajes, parque acuático, shows en vivo y diversión para toda la familia.",
        "precioBase": 18500,
        "duraciones": [
            {"value": "5d4n", "text": "5 días, 4 noches", "noches": 4, "precio": 18500},
            {"value": "7d6n", "text": "7 días, 6 noches", "noches": 6, "precio": 27750},
            {"value": "10d9n", "text": "10 días, 9 noches", "noches": 9, "precio": 41625}
        ],
        "itinerario": [
            "Día 1: Llegada y check-in",
            "Día 2: Parque acuático y Slime Time",
            "Día 3: Espuma Party y encuentro con personajes",
            "Día 4: Día libre en la playa",
            "Día 5: Check-out"
        ],
        "incluye": [
            "Alojamiento todo incluido",
            "Acceso ilimitado al parque acuático",
            "Shows y eventos de Nickelodeon",
            "Comidas y bebidas ilimitadas",
            "Actividades para niños y adultos"
        ]
    },
    "cuba": {
        "id": "cuba",
        "destino": "Varadero, Cuba",
        "imagen": "imagenes/cuba.jpg",
        "descripcion": "Relájate en las playas de arena blanca de Varadero con este paquete todo incluido. Disfruta de la cultura cubana, música en vivo y del famoso malecón de La Habana.",
        "precioBase": 16500,
        "duraciones": [
            {"value": "7d6n", "text": "7 días, 6 noches", "noches": 6, "precio": 16500},
            {"value": "10d9n", "text": "10 días, 9 noches", "noches": 9, "precio": 24750},
            {"value": "14d13n", "text": "14 días, 13 noches", "noches": 13, "precio": 35750}
        ],
        "itinerario": [
            "Día 1: Llegada a La Habana - Tour por la ciudad",
            "Día 2: Visita al Museo del Ron y Plaza Vieja",
            "Día 3: Traslado a Varadero",
            "Días 4-6: Playa y actividades acuáticas",
            "Día 7: Regreso"
        ],
        "incluye": [
            "Vuelos redondos",
            "Alojamiento en hotel 4 estrellas todo incluido",
            "Tour por La Habana",
            "Traslados aeropuerto-hotel-aeropuerto",
            "Comidas y bebidas ilimitadas"
        ]
    },
    "xochimilco": {
        "id": "xochimilco",
        "destino": "Basílica y Xochimilco, CDMX",
        "imagen": "imagenes/xochimilco.jpg",
        "descripcion": "Tour cultural por dos de los lugares más emblemáticos de la Ciudad de México. Visita religiosa a la Basílica de Guadalupe y paseo festivo en trajinera por Xochimilco.",
        "precioBase": 1200,
        "duraciones": [
            {"value": "1d", "text": "1 día", "noches": 0, "precio": 1200},
            {"value": "2d1n", "text": "2 días, 1 noche", "noches": 1, "precio": 2000},
            {"value": "3d2n", "text": "3 días, 2 noches", "noches": 2, "precio": 3200}
        ],
        "itinerario": [
            "Mañana: Visita a la Basílica de Guadalupe",
            "Mediodía: Comida tradicional",
            "Tarde: Paseo en trajinera por los canales",
            "Noche: Regreso al punto de encuentro"
        ],
        "incluye": [
            "Transporte redondo",
            "Guía certificado bilingüe",
            "Comida en trajinera (menú tradicional)",
            "Paseo en trajinera de 2 horas",
            "Seguro de viajero"
        ]
    },
    "vallarta": {
        "id": "vallarta",
        "destino": "Puerto Vallarta, México",
        "imagen": "imagenes/vallarta.jpg",
        "descripcion": "Escápate a las playas del Pacífico mexicano. Disfruta del malecón, los restaurantes frente al mar y las excursiones a las playas escondidas de Puerto Vallarta.",
        "precioBase": 14200,
        "duraciones": [
            {"value": "4d3n", "text": "4 días, 3 noches", "noches": 3, "precio": 14200},
            {"value": "5d4n", "text": "5 días, 4 noches", "noches": 4, "precio": 18933},
            {"value": "7d6n", "text": "7 días, 6 noches", "noches": 6, "precio": 28400}
        ],
        "itinerario": [
            "Día 1: Llegada y check-in",
            "Día 2: Tour por el malecón y centro histórico",
            "Día 3: Excursión a las islas Marietas",
            "Día 4: Día libre en la playa",
            "Día 5: Check-out"
        ],
        "incluye": [
            "Vuelo redondo en clase turista",
            "Alojamiento en hotel 4 estrellas",
            "Desayunos diarios",
            "Tour por el malecón",
            "Transporte aeropuerto-hotel-aeropuerto"
        ]
    }
};

// Función para cargar los datos del paquete
function loadPackageData(packageId) {
    const package = packagesData[packageId];
    if (!package) {
        // Redirigir si el paquete no existe
        window.location.href = 'ofertas.html';
        return;
    }

    // Actualizar información básica
    document.getElementById('destination-input').value = `Destino: ${package.destino}`;
    document.getElementById('tour-image').src = package.imagen;
    document.getElementById('tour-image').alt = package.destino;
    document.getElementById('tour-description-text').textContent = package.descripcion;
    document.getElementById('package-id').value = package.id;

    // Actualizar precio base
    document.getElementById('base-price').textContent = `$${package.precioBase.toLocaleString('es-MX')}`;

    // Actualizar opciones de duración
    const durationSelect = document.getElementById('duracion-select');
    durationSelect.innerHTML = '';
    package.duraciones.forEach(duration => {
        const option = document.createElement('option');
        option.value = duration.value;
        option.textContent = duration.text;
        option.setAttribute('data-noches', duration.noches);
        option.setAttribute('data-precio', duration.precio);
        durationSelect.appendChild(option);
    });

    // Actualizar itinerario
    const itineraryList = document.getElementById('itinerary-list');
    itineraryList.innerHTML = '';
    package.itinerario.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itineraryList.appendChild(li);
    });

    // Actualizar qué incluye
    const includedList = document.getElementById('included-list');
    includedList.innerHTML = '';
    package.incluye.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        includedList.appendChild(li);
    });

    // Calcular precio inicial
    updateTotalPrice();
}

// Función para actualizar el precio total
function updateTotalPrice() {
    const durationSelect = document.getElementById('duracion-select');
    const peopleSelect = document.getElementById('personas-select');
    const totalPriceElement = document.getElementById('total-price');
    const montoTotalInput = document.getElementById('input-monto-total');

    const selectedOption = durationSelect.options[durationSelect.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute('data-precio'));
    const people = parseInt(peopleSelect.value);
    
    const total = Math.round(basePrice * people * 100) / 100;
    
    totalPriceElement.textContent = `$${total.toLocaleString('es-MX')}`;
    montoTotalInput.value = total;
}

// Función para cambiar entre pestañas
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover clase active de todos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Agregar clase active al seleccionado
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", function() {
    // Obtener ID del paquete de la URL
    const urlParams = new URLSearchParams(window.location.search);
    let packageId = urlParams.get('id');

    // Si no hay en URL, verificar localStorage
    if (!packageId) {
        packageId = localStorage.getItem('selectedPackageId');
    }

    // Si aún no hay, usar europa por defecto
    if (!packageId || !packagesData[packageId]) {
        packageId = 'europa';
    }

    // Cargar datos del paquete
    loadPackageData(packageId);

    // Configurar eventos para actualizar precio
    document.getElementById('duracion-select').addEventListener('change', updateTotalPrice);
    document.getElementById('personas-select').addEventListener('change', updateTotalPrice);

    // Configurar pestañas
    setupTabs();

    // Configurar botón de imprimir
    document.querySelector('.print-btn').addEventListener('click', () => {
        window.print();
    });
});