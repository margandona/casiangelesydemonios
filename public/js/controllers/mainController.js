$(document).ready(function() {
    loadView('home');

    $('#mainContent').on('click', '#showRegisterButton', function() {
        loadView('register');
    });

    $('#mainContent').on('click', '#showLoginButton', function() {
        loadView('login');
    });

    $('#mainContent').on('click', '#logoutButton', function() {
        userModel.logout().then(() => {
            alert('Sesión cerrada exitosamente');
            loadView('home');
        }).catch(error => {
            alert('Error al cerrar sesión');
            console.error(error);
        });
    });

    $('#mainContent').on('click', '#showFormButton', function() {
        loadView('report');
    });

    $('#mainContent').on('submit', '#searchForm', function(event) {
        event.preventDefault();
        const query = $('#searchQuery').val().trim();
        if (!query) {
            alert('Por favor ingrese un término de búsqueda');
            return;
        }

        reportModel.searchReports(query)
            .then(reports => {
                MainView.displayReports(reports);
            })
            .catch(error => {
                console.error('Error en la búsqueda:', error);
                $('#searchResults').html('<div class="alert alert-danger">Error en la búsqueda</div>');
            });
    });

    $('#mainContent').on('click', '#showAllReportsButton', function() {
        reportModel.getAllReports()
            .then(reports => {
                MainView.displayReports(reports);
            })
            .catch(error => {
                console.error('Error al cargar los reportes:', error);
                $('#searchResults').html('<div class="alert alert-danger">Error al cargar los reportes</div>');
            });
    });
});

function loadView(viewName) {
    $('#mainContent').load(`js/views/${viewName}.html`, function() {
        if (viewName === 'register') {
            RegisterView.init();
        } else if (viewName === 'login') {
            LoginView.init();
        } else if (viewName === 'home') {
            MainView.init();
        } else if (viewName === 'report') {
            ReportView.init();
        }
    });
}
