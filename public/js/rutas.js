$(document).ready(function() {
    const reportForm = $('#reportForm');
    const editReportForm = $('#editReportForm');
    const fetchUrl = 'https://casiangelesydemonios.web.app/api/reports'; // Changed to HTTP for local development

    reportForm.on('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(reportForm[0]);

        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(error => { throw new Error(error) });
            }
            return response.json();
        })
        .then(data => {
            alert('Report added successfully');
            reportForm[0].reset(); // Reset the form after successful submission
            $('#reportModal').modal('hide'); // Hide the modal
        })
        .catch(error => {
            console.error('Error adding report:', error.message);
        });
    });

    $('#reportModal').on('show.bs.modal', function () {
        $(this).removeAttr('inert');
    });

    $('#reportModal').on('hidden.bs.modal', function () {
        $(this).attr('inert', '');
    });

    $('#editReportForm').on('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(editReportForm[0]);
        const reportId = $('#editReportForm').data('report-id');

        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch(`${fetchUrl}/${reportId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(error => { throw new Error(error) });
            }
            return response.json();
        })
        .then(data => {
            alert('Report updated successfully');
            editReportForm[0].reset(); // Reset the form after successful submission
            $('#editReportModal').modal('hide'); // Hide the modal
            $('#showAllReportsButton').click(); // Refresh the reports list
        })
        .catch(error => {
            console.error('Error updating report:', error.message);
        });
    });

    $('#editReportModal').on('show.bs.modal', function () {
        $(this).removeAttr('inert');
    });

    $('#editReportModal').on('hidden.bs.modal', function () {
        $(this).attr('inert', '');
    });

    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        const query = $('#searchQuery').val();
        const url = query ? `https://casiangelesydemonios.web.app/api/reports/search?query=${query}` : 'http://localhost:3000/api/reports';
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.message) });
                }
                return response.json();
            })
            .then(data => {
                let resultsHtml = '<ul class="list-group">';
                data.forEach(report => {
                    resultsHtml += `
                    <li class="list-group-item" style="user-select: none;">
                        <strong>Nombre:</strong> ${report.nombre}<br>
                        <strong>Apellido:</strong> ${report.apellido}<br>
                        <strong>Nicknames:</strong> ${report.nickNames}<br>
                        <strong>Nacionalidad:</strong> ${report.nacionalidad}<br>
                        <strong>Rut:</strong> ${report.rut}<br>
                        <strong>Paga Puntual:</strong> ${report.paga_puntual}<br>
                        <strong>Habitación Limpia y Ordenada:</strong> ${report.HabitacionLimpiaYOrdenada}<br>
                        <strong>Tranquila y Ordenada:</strong> ${report.TranquilaYOrdenada}<br>
                        <strong>Consume Marihuana:</strong> ${report.ConsumeMarihuana}<br>
                        <strong>Consume Otras Drogas:</strong> ${report.ConsumeOtrasDrogas}<br>
                        <strong>Consumo Alcohol Excesivo:</strong> ${report.ConsumoAlcoholExesivo}<br>
                        <strong>Amenaza a la Policía:</strong> ${report.AmenazaPolicia}<br>
                        <strong>Amenaza a Extranjeros:</strong> ${report.amenazaExtranjeros}<br>
                        <strong>Destrozos:</strong> ${report.Destrozos}<br>
                        <strong>Grita e Insulta al Arrendatario:</strong> ${report.GritaEInsultaArrendatario}<br>
                        <strong>Robos:</strong> ${report.Robos}<br>
                        <strong>Buenas Relaciones con Pasajeros:</strong> ${report.BuenasRelacionesPasajeros}<br>
                        <strong>Avisa con Anticipación la Retirada:</strong> ${report.AvisaConAntisipaciínRetirada}<br>
                        <strong>Independiente:</strong> ${report.Independiante}<br>
                        <strong>Privado:</strong> ${report.privado}<br>
                        <strong>Llavero:</strong> ${report.llavero}<br>
                        <strong>Mete Gente Ajena:</strong> ${report.MeteGenteAgena}<br>
                        <strong>Comentario:</strong> ${report.comentario}<br>
                    </li>`;
                });
                resultsHtml += '</ul>';
                $('#searchResults').html(resultsHtml);
            })
            .catch(error => {
                console.error('Error fetching reports:', error.message);
                $('#searchResults').html(`<div class="alert alert-danger">${error.message}</div>`);
            });
    });

    $('#showAllReportsButton').on('click', function() {
        fetch('https://casiangelesydemonios.web.app/api/reports', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.message) });
                }
                return response.json();
            })
            .then(data => {
                let resultsHtml = '<ul class="list-group">';
                data.forEach(report => {
                    resultsHtml += `
                    <li class="list-group-item" style="user-select: none;">
                        <strong>Nombre:</strong> ${report.nombre}<br>
                        <strong>Apellido:</strong> ${report.apellido}<br>
                        <strong>Nicknames:</strong> ${report.nickNames}<br>
                        <strong>Nacionalidad:</strong> ${report.nacionalidad}<br>
                        <strong>Rut:</strong> ${report.rut}<br>
                        <strong>Paga Puntual:</strong> ${report.paga_puntual}<br>
                        <strong>Habitación Limpia y Ordenada:</strong> ${report.HabitacionLimpiaYOrdenada}<br>
                        <strong>Tranquila y Ordenada:</strong> ${report.TranquilaYOrdenada}<br>
                        <strong>Consume Marihuana:</strong> ${report.ConsumeMarihuana}<br>
                        <strong>Consume Otras Drogas:</strong> ${report.ConsumeOtrasDrogas}<br>
                        <strong>Consumo Alcohol Excesivo:</strong> ${report.ConsumoAlcoholExesivo}<br>
                        <strong>Amenaza a la Policía:</strong> ${report.AmenazaPolicia}<br>
                        <strong>Amenaza a Extranjeros:</strong> ${report.amenazaExtranjeros}<br>
                        <strong>Destrozos:</strong> ${report.Destrozos}<br>
                        <strong>Grita e Insulta al Arrendatario:</strong> ${report.GritaEInsultaArrendatario}<br>
                        <strong>Robos:</strong> ${report.Robos}<br>
                        <strong>Buenas Relaciones con Pasajeros:</strong> ${report.BuenasRelacionesPasajeros}<br>
                        <strong>Avisa con Anticipación la Retirada:</strong> ${report.AvisaConAntisipaciínRetirada}<br>
                        <strong>Independiente:</strong> ${report.Independiante}<br>
                        <strong>Privado:</strong> ${report.privado}<br>
                        <strong>Llavero:</strong> ${report.llavero}<br>
                        <strong>Mete Gente Ajena:</strong> ${report.MeteGenteAgena}<br>
                        <strong>Comentario:</strong> ${report.comentario}<br>
                        <button class="btn btn-warning btn-sm edit-report" data-id="${report.id}" data-toggle="modal" data-target="#editReportModal">Editar</button>
                        <button class="btn btn-danger btn-sm delete-report" data-id="${report.id}">Eliminar</button>
                    </li>`;
                });
                resultsHtml += '</ul>';
                $('#searchResults').html(resultsHtml);

                $('.edit-report').on('click', function() {
                    const reportId = $(this).data('id');
                    fetch(`https://casiangelesydemonios.web.app/api/reports/${reportId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => response.json())
                    .then(report => {
                        $('#editReportForm').data('report-id', reportId);
                        $('#editReportForm #nombre').val(report.nombre);
                        $('#editReportForm #apellido').val(report.apellido);
                        $('#editReportForm #nickNames').val(report.nickNames);
                        $('#editReportForm #nacionalidad').val(report.nacionalidad);
                        $('#editReportForm #imagen').val(report.imagen);
                        $('#editReportForm #CI_or_passport').val(report.CI_or_passport);
                        $('#editReportForm #rut').val(report.rut);
                        $('#editReportForm #genero').val(report.genero);
                        $('#editReportForm #telefono').val(report.telefono);
                        $('#editReportForm #email').val(report.email);
                        $('#editReportForm #paga_puntual').val(report.paga_puntual);
                        $('#editReportForm #HabitacionLimpiaYOrdenada').val(report.HabitacionLimpiaYOrdenada);
                        $('#editReportForm #TranquilaYOrdenada').val(report.TranquilaYOrdenada);
                        $('#editReportForm #ConsumeMarihuana').val(report.ConsumeMarihuana);
                        $('#editReportForm #ConsumeOtrasDrogas').val(report.ConsumeOtrasDrogas);
                        $('#editReportForm #ConsumoAlcoholExesivo').val(report.ConsumoAlcoholExesivo);
                        $('#editReportForm #AmenazaPolicia').val(report.AmenazaPolicia);
                        $('#editReportForm #amenazaExtranjeros').val(report.amenazaExtranjeros);
                        $('#editReportForm #Destrozos').val(report.Destrozos);
                        $('#editReportForm #GritaEInsultaArrendatario').val(report.GritaEInsultaArrendatario);
                        $('#editReportForm #Robos').val(report.Robos);
                        $('#editReportForm #BuenasRelacionesPasajeros').val(report.BuenasRelacionesPasajeros);
                        $('#editReportForm #AvisaConAntisipaciínRetirada').val(report.AvisaConAntisipaciínRetirada);
                        $('#editReportForm #Independiante').val(report.Independiante);
                        $('#editReportForm #privado').val(report.privado);
                        $('#editReportForm #llavero').val(report.llavero);
                        $('#editReportForm #MeteGenteAgena').val(report.MeteGenteAgena);
                        $('#editReportForm #comentario').val(report.comentario);
                    })
                    .catch(error => {
                        console.error('Error fetching report:', error.message);
                    });
                });

                $('.delete-report').on('click', function() {
                    const reportId = $(this).data('id');
                    if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
                        fetch(`https://casiangelesydemonios.web.app/api/reports/${reportId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        .then(response => {
                            if (!response.ok) {
                                return response.text().then(error => { throw new Error(error) });
                            }
                            alert('Report deleted successfully');
                            $('#showAllReportsButton').click(); // Refresh the reports list
                        })
                        .catch(error => {
                            console.error('Error deleting report:', error.message);
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching reports:', error.message);
                $('#searchResults').html(`<div class="alert alert-danger">${error.message}</div>`);
            });
    });

    $('#registerForm').on('submit', function(event) {
        event.preventDefault();
        const name = $('#registerFullName').val();
        const username = $('#registerUsername').val();
        const city = $('#registerCity').val();
        const email = $('#registerEmail').val();
        const birthdate = $('#registerBirthdate').val();
        const nacionalidad = $('#registerNacionalidad').val();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#registerConfirmPassword').val();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        console.log('Registering user:', { name, username, city, email, birthdate, nacionalidad, password }); // Add logging

        fetch('https://casiangelesydemonios.web.app/api/register', { // Changed to HTTP for local development
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, city, email, birthdate, nacionalidad, password, confirmPassword })
        })
        .then(response => {
            console.log('Register response status:', response.status); // Add logging
            return response.json().then(data => ({ status: response.status, data }));
        })
        .then(({ status, data }) => {
            if (status !== 201) {
                throw new Error(data.error || 'Registration failed');
            }
            console.log('Register success:', data); // Add logging
            alert('User registered successfully');
            $('#registerForm')[0].reset(); // Reset the form after successful submission
            $('#registerModal').modal('hide'); // Hide the modal
        })
        .catch(error => {
            console.error('Error registering user:', error.message);
            alert('Error registering user: ' + error.message);
        });
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        console.log('Logging in user:', { email, password }); // Add logging

        fetch('https://casiangelesydemonios.web.app/api/login', { // Changed to HTTP for local development
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            console.log('Login response status:', response.status); // Add logging
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    throw new Error('Unexpected token in JSON: ' + text);
                }
            }).then(data => ({ status: response.status, data }));
        })
        .then(({ status, data }) => {
            if (status !== 200) {
                throw new Error(data.error || 'Login failed');
            }
            console.log('Login success:', data); // Add logging
            alert('User logged in successfully');
            localStorage.setItem('token', data.token); // Store token in localStorage
            $('#loginForm')[0].reset(); // Reset the form after successful submission
            $('#loginModal').modal('hide'); // Hide the modal
            $('#informeContainer').show(); // Show the informe container
            $('#logoutButton').show(); // Show the logout button
            $('#showRegisterButton').hide(); // Hide the register button
            $('#showLoginButton').hide(); // Hide the login button
        })
        .catch(error => {
            console.error('Error logging in user:', error.message);
            alert('Error logging in user: ' + error.message);
        });
    });

    $('#logoutButton').on('click', function() {
        localStorage.removeItem('token'); // Remove token from localStorage
        $('#informeContainer').hide(); // Hide the informe container
        $('#logoutButton').hide(); // Hide the logout button
        $('#showRegisterButton').show(); // Show the register button
        $('#showLoginButton').show(); // Show the login button
        alert('User logged out successfully');
    });

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token') !== null;
    if (isLoggedIn) {
        $('#informeContainer').show();
        $('#logoutButton').show();
        $('#showRegisterButton').hide();
        $('#showLoginButton').hide();
    }

    $('#registerModal').on('show.bs.modal', function () {
        $(this).removeAttr('inert');
    });

    $('#registerModal').on('hidden.bs.modal', function () {
        $(this).attr('inert', '');
    });

    $('#loginModal').on('show.bs.modal', function () {
        $(this).removeAttr('inert');
    });

    $('#loginModal').on('hidden.bs.modal', function () {
        $(this).attr('inert', '');
    });

    $('#googleSignInButton').on('click', function() {
        window.location.href = '/auth/google';
    });
});