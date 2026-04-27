/* ==========================================================================
   LÓGICA DEL PORTAFOLIO | NICOLE DAZA
   Buenas prácticas aplicadas: 
   - Uso de 'const' y 'let' (evitar 'var').
   - EventListener para asegurar que el DOM cargó antes de ejecutar scripts.
   - IntersectionObserver para animaciones eficientes sin sobrecargar el navegador.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFECTO DE APARICIÓN AL HACER SCROLL (Fade In)
    // Seleccionamos todas las secciones principales y las tarjetas de habilidades
    const seccionesOcultas = document.querySelectorAll('section, .tarjeta-habilidad');

    // Configuramos nuestro 'vigilante' (Intersection Observer)
    const opcionesDelObservador = {
        root: null, // Observa respecto a la ventana entera (viewport)
        threshold: 0.15, // Se activa cuando el 15% del elemento ya es visible
        rootMargin: "0px" 
    };

    const animarAlHacerScroll = new IntersectionObserver(function(entradas, observador) {
        entradas.forEach(entrada => {
            // Si el elemento está en la pantalla...
            if (entrada.isIntersecting) {
                // Le agregamos una clase CSS (que crearemos dinámicamente) para que aparezca
                entrada.target.classList.add('aparecer');
                // Una vez que ya apareció, dejamos de observarlo para ahorrar memoria
                observador.unobserve(entrada.target); 
            }
        });
    }, opcionesDelObservador);

    // Le decimos al vigilante que comience a observar cada sección oculta
    seccionesOcultas.forEach(seccion => {
        // Primero, las volvemos invisibles y las bajamos un poquito con JS
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(30px)';
        seccion.style.transition = 'all 0.6s ease-out'; // Transición fluida
        
        animarAlHacerScroll.observe(seccion);
    });

    // Pequeño truco: Definimos qué hace la clase 'aparecer' directo desde JS
    // (Aunque normalmente iría en CSS, esto te muestra cómo manipular estilos desde JS)
    const estiloDinamico = document.createElement('style');
    estiloDinamico.innerHTML = `
        .aparecer {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(estiloDinamico);


    // 2. ACTUALIZACIÓN AUTOMÁTICA DEL AÑO EN EL PIE DE PÁGINA
    // Así no tienes que acordarte de cambiar el año a mano el próximo enero xD
    const textoDerechos = document.querySelector('.derechos');
    if (textoDerechos) {
        const añoActual = new Date().getFullYear();
        textoDerechos.innerHTML = `&copy; ${añoActual} Nicole Daza`;
    }

});