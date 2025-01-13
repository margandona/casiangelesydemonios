$(document).ready(function () {
    // Toggle the nav menu
    $('#navToggle').on('click', function () {
        $('#navMenu').toggleClass('navbar__menu--active');
    });

    // Close the menu when clicking on a link in mobile view
    $('#navMenu a').on('click', function () {
        if (window.innerWidth <= 768) {
            $('#navMenu').removeClass('navbar__menu--active');
        }
    });

    // Adjust menu visibility on window resize
    $(window).on('resize', function () {
        if (window.innerWidth > 768) {
            $('#navMenu').removeClass('navbar__menu--active');
            $('#navMenu').css('display', 'flex'); // Make sure it displays as flex for larger screens
        } else {
            $('#navMenu').css('display', 'none'); // Hide on smaller screens until toggled
        }
    });

    // Ensure correct display property on initial page load
    if (window.innerWidth > 768) {
        $('#navMenu').css('display', 'flex');
    } else {
        $('#navMenu').css('display', 'none');
    }

// Download shortcut for radio
$('#downloadRadio').on('click', function () {
    const link = document.createElement('a');
    const shortcutContent = `
        <html>
        <head>
            <title>Radio Frecuencia Interactiva</title>
            <link rel="icon" href="https://example.com/icon.png" type="image/png">
            <meta http-equiv="refresh" content="0; url=https://www.frecuenciainteractiva.cl">
        </head>
        <body>
            <p>Si no redirige automáticamente, haga clic <a href="https://www.frecuenciainteractiva.cl">aquí</a>.</p>
        </body>
        </html>
    `;
    const blob = new Blob([shortcutContent], { type: 'text/html' });
    link.href = URL.createObjectURL(blob);
    link.download = 'RadioFrecuenciaInteractiva.html';
    link.click();
});

    // Toggle the visual rest mode
    $('#restModeButton').on('click', function () {
        $('body').toggleClass('visual-rest-mode');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos del DOM
    const contactMenu = document.getElementById('contactMenu');
    const contactFormContainer = document.getElementById('contactFormContainer');
    const contactForm = document.getElementById('contactForm');
    const closeContactFormButton = document.getElementById('closeContactForm');

    // Mostrar el formulario al hacer clic en "Contacto"
    contactMenu.addEventListener('click', function (e) {
        e.preventDefault();
        contactFormContainer.classList.remove('hidden');
    });

    // Ocultar el formulario al hacer clic en "Cerrar"
    closeContactFormButton.addEventListener('click', function () {
        contactFormContainer.classList.add('hidden');
    });

    // Validar y enviar el formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validación de campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Enviar formulario (simulado)
        alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');

        // Limpiar formulario y ocultarlo
        contactForm.reset();
        contactFormContainer.classList.add('hidden');
    });

    // Función para validar el formato del correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
