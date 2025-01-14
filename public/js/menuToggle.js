document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos del DOM
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const restModeButton = document.getElementById('restModeButton');
    
    // Toggle el menú cuando se hace clic en el botón del menú
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('navbar__menu--active');
        restModeButton.classList.toggle('visible-in-menu');
    });

    // Asegurarse de cerrar el menú cuando se hace clic en una opción
    navMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            navMenu.classList.remove('navbar__menu--active');
            restModeButton.classList.remove('visible-in-menu');
        }
    });

    // Gestionar la visibilidad del menú en función del tamaño de la ventana
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('navbar__menu--active');
            navMenu.style.display = 'flex'; // Asegurarse de mostrar el menú en pantallas grandes
        } else {
            navMenu.style.display = 'none'; // Ocultar el menú en pantallas pequeñas hasta que se haga clic en el toggle
        }
    });

    // Asegurar la correcta visibilidad del menú en la carga inicial de la página
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});
