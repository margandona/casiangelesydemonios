const MainView = {
    render() {
        return `
            <div id="mainContent">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a href="#" class="btn btn-primary">Regresar</a>
                        <div class="ml-auto">
                            <button id="showRegisterButton" class="btn btn-secondary" data-toggle="modal" data-target="#registerModal">Registrarse</button>
                            <button id="showLoginButton" class="btn btn-secondary" data-toggle="modal" data-target="#loginModal">Iniciar Sesión</button>
                            <button id="logoutButton" class="btn btn-danger" style="display: none;">Cerrar Sesión</button>
                        </div>
                    </div>
                </nav>
                <div id="informeContainer" class="container" style="display: none;">
                    <h2>Informe de Comportamiento</h2>
                    <button id="showFormButton" class="btn btn-secondary" data-toggle="modal" data-target="#reportModal">Mostrar Formulario</button>
                    <form id="searchForm" class="mt-3">
                        <div class="form-group">
                            <label for="searchQuery">Buscar Reporte:</label>
                            <input type="text" id="searchQuery" name="searchQuery" class="form-control" 
                                   placeholder="Ingrese nombre, ID, CI o pasaporte, teléfono o nick">
                        </div>
                        <button type="submit" class="btn btn-primary">Buscar</button>
                        <button id="showAllReportsButton" type="button" class="btn btn-secondary">Mostrar Todos los Reportes</button>
                    </form>
                    <div id="searchResults" class="mt-3"></div>
                </div>
                <div id="modalContainer"></div>
            </div>
        `;
    },

    init() {
        this.bindEvents();
        this.checkAuthState();
        $('#searchButton').on('click', this.handleSearch.bind(this));
        $('#showAllReportsButton').on('click', this.handleShowAllReports.bind(this));
    },

    bindEvents() {
        $(document).on('click', '#showRegisterButton', () => {
            $('#modalContainer').html(RegisterView.render());
            $('#registerModal').modal('show');
            RegisterView.init();
        });

        $(document).on('click', '#showLoginButton', () => {
            $('#modalContainer').html(LoginView.render());
            $('#loginModal').modal('show');
            LoginView.init();
        });

        $(document).on('click', '#showFormButton', () => {
            $('#modalContainer').html(ReportView.render());
            $('#reportModal').modal('show');
            ReportView.init();
        });

        $(document).on('submit', '#searchForm', this.handleSearch.bind(this));
    },

    checkAuthState() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                $('#showRegisterButton, #showLoginButton').hide();
                $('#logoutButton, #informeContainer').show();
            } else {
                $('#showRegisterButton, #showLoginButton').show();
                $('#logoutButton, #informeContainer').hide();
            }
        });
    },

    async handleShowAllReports(event) {
        event.preventDefault();
        try {
            const reports = await reportModel.getAllReports();
            this.displayReports(reports);
        } catch (error) {
            console.error('Error fetching all reports:', error);
            alert('Error fetching all reports');
        }
    },

    displayReports(reports) {
        if (!reports || reports.length === 0) {
            $('#searchResults').html('<div class="alert alert-info">No se encontraron reportes</div>');
            return;
        }

        const reportsHtml = reports.map(report => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${report.nombre} ${report.apellido}</h5>
                    <p class="card-text">
                        <strong>Nick:</strong> ${report.nickNames}<br>
                        <strong>Teléfono:</strong> ${Array.isArray(report.telefono) ? report.telefono.join(', ') : report.telefono}<br>
                        <strong>Email:</strong> ${report.email || 'No disponible'}
                    </p>
                    <button class="btn btn-info btn-sm viewDetails" data-id="${report.id}">Ver Detalles</button>
                    <button class="btn btn-warning btn-sm editReport" data-id="${report.id}">Editar</button>
                    <button class="btn btn-danger btn-sm deleteReport" data-id="${report.id}">Eliminar</button>
                </div>
            </div>
        `).join('');

        $('#searchResults').html(reportsHtml);
    },

    async handleSearch(event) {
        event.preventDefault();
        const query = $('#searchQuery').val().trim();
        if (!query) {
            alert('Por favor ingrese un término de búsqueda');
            return;
        }

        try {
            const reports = await reportModel.searchReports(query);
            this.displayReports(reports);
        } catch (error) {
            console.error('Error searching reports:', error);
            $('#searchResults').html('<div class="alert alert-danger">Error en la búsqueda</div>');
        }
    }
};