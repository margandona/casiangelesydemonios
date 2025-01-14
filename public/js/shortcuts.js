document.addEventListener('DOMContentLoaded', function () {
    // Referencia a los elementos del DOM
    const downloadRadio = document.getElementById('downloadRadio');

    // Descargar acceso directo para escritorio o mostrar instrucciones para móvil
    downloadRadio.addEventListener('click', function (e) {
        e.preventDefault();

        if (isMobileDevice()) {
            // Mostrar instrucciones para agregar a la pantalla de inicio
            alert('Para agregar este sitio a la pantalla de inicio, abre las opciones del navegador y selecciona "Agregar a la pantalla de inicio".');
        } else {
            // Descargar acceso directo para escritorio
            createDesktopShortcut();
        }
    });

    // Función para detectar si el usuario está en un dispositivo móvil
    function isMobileDevice() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    // Función para crear un archivo de acceso directo para escritorio
    function createDesktopShortcut() {
        const link = document.createElement('a');
        const shortcutContent = `
            [InternetShortcut]
            URL=https://s57.radiolize.com/radio/8090/radio.mp3
            IconIndex=0
            IconFile=https://www.makuaz.cl/favicon.ico
        `;

        const blob = new Blob([shortcutContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        link.href = url;
        link.download = 'RadioFrecuenciaInteractiva.url';
        link.click();
    }
});
