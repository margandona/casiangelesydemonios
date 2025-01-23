// rutas.js
$(document).ready(function() {
    // Existing code in rutas.js
});

// reports.js
$(document).ready(function() {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const reportForm = $('#reportForm');
    const editReportForm = $('#editReportForm');
    const db = firebase.firestore();

    reportForm.on('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(reportForm[0]);

        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        db.collection('reports').add(jsonData)
            .then(() => {
                alert('Report added successfully');
                reportForm[0].reset(); // Reset the form after successful submission
                $('#reportModal').modal('hide'); // Hide the modal
            })
            .catch((error) => {
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

        db.collection('reports').doc(reportId).update(jsonData)
            .then(() => {
                alert('Report updated successfully');
                editReportForm[0].reset(); // Reset the form after successful submission
                $('#editReportModal').modal('hide'); // Hide the modal
                $('#showAllReportsButton').click(); // Refresh the reports list
            })
            .catch((error) => {
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
        let reportsRef = db.collection('reports');

        if (query) {
            reportsRef = reportsRef.where('nombre', '==', query);
        }

        reportsRef.get()
            .then((querySnapshot) => {
                let resultsHtml = '<ul class="list-group">';
                querySnapshot.forEach((doc) => {
                    const report = doc.data();
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
            .catch((error) => {
                console.error('Error fetching reports:', error.message);
                $('#searchResults').html(`<div class="alert alert-danger">${error.message}</div>`);
            });
    });

    $('#showAllReportsButton').on('click', function() {
        db.collection('reports').get()
            .then((querySnapshot) => {
                let resultsHtml = '<ul class="list-group">';
                querySnapshot.forEach((doc) => {
                    const report = doc.data();
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
                        <button class="btn btn-warning btn-sm edit-report" data-id="${doc.id}" data-toggle="modal" data-target="#editReportModal">Editar</button>
                        <button class="btn btn-danger btn-sm delete-report" data-id="${doc.id}">Eliminar</button>
                    </li>`;
                });
                resultsHtml += '</ul>';
                $('#searchResults').html(resultsHtml);

                $('.edit-report').on('click', function() {
                    const reportId = $(this).data('id');
                    db.collection('reports').doc(reportId).get()
                        .then((doc) => {
                            const report = doc.data();
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
                        .catch((error) => {
                            console.error('Error fetching report:', error.message);
                        });
                });

                $('.delete-report').on('click', function() {
                    const reportId = $(this).data('id');
                    if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
                        db.collection('reports').doc(reportId).delete()
                            .then(() => {
                                alert('Report deleted successfully');
                                $('#showAllReportsButton').click(); // Refresh the reports list
                            })
                            .catch((error) => {
                                console.error('Error deleting report:', error.message);
                            });
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching reports:', error.message);
                $('#searchResults').html(`<div class="alert alert-danger">${error.message}</div>`);
            });
    });
});
