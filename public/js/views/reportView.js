const ReportView = {
    render() {
        return `
            <div class="modal fade" id="reportModal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Informe de Comportamiento</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="reportForm">
                                <div class="form-group">
                                    <label for="nombre">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Ingrese el nombre del pasajero" required>
                                </div>
                                <div class="form-group">
                                    <label for="apellido">Apellido:</label>
                                    <input type="text" id="apellido" name="apellido" class="form-control" placeholder="Ingrese el apellido del pasajero" required>
                                </div>
                                <div class="form-group">
                                    <label for="nickNames">Nicknames:</label>
                                    <div id="nickNamesContainer">
                                        <div class="input-group mb-2">
                                            <input type="text" id="nickNames" name="nickNames[]" class="form-control" placeholder="Ingresa los nombres de fantasía" required>
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-secondary btn-sm addNickNameButton">Agregar Nickname</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="nacionalidad">Nacionalidad:</label>
                                    <input type="text" id="nacionalidad" name="nacionalidad" class="form-control" placeholder="Ingrese la nacionalidad del pasajero" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="imagen">URL de la Foto:</label>
                                    <input type="url" id="imagen" name="imagen" class="form-control" placeholder="Ingrese la URL de la foto" required>
                                </div>
                                <div class="form-group">
                                    <label for="CI_or_passport">URL de CI o Pasaporte:</label>
                                    <input type="url" id="CI_or_passport" name="CI_or_passport" class="form-control" placeholder="Ingrese la URL de CI o Pasaporte" required>
                                </div>
                                <div class="form-group">
                                    <label for="rut">RUT:</label>
                                    <input type="text" id="rut" name="rut" class="form-control" placeholder="Ingrese el rut del pasajero" required>
                                </div>
                                <div class="form-group">
                                    <label for="genero">Género:</label>
                                    <select id="genero" name="genero" class="form-control" required>
                                        <option value="female">Femenino</option>
                                        <option value="male">Masculino</option>
                                        <option value="shemale">Transgénero</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="telefono">Número de Teléfono:</label>
                                    <div id="telefonoContainer">
                                        <div class="input-group mb-2">
                                            <input type="tel" id="telefono" name="telefono[]" class="form-control" placeholder="Ingrese el número de teléfono" required>
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-secondary btn-sm addPhoneNumberButton">Agregar Teléfono</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email">Correo Electrónico:</label>
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Ingrese el correo electrónico">
                                </div>
                                <div class="form-group">
                                    <label for="paga_puntual">Paga Puntual:</label>
                                    <select id="paga_puntual" name="paga_puntual" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="HabitacionLimpiaYOrdenada">Habitación Limpia y Ordenada:</label>
                                    <select id="HabitacionLimpiaYOrdenada" name="HabitacionLimpiaYOrdenada" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="TranquilaYOrdenada">Tranquila y Ordenada:</label>
                                    <select id="TranquilaYOrdenada" name="TranquilaYOrdenada" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="ConsumeMarihuana">Consume Marihuana:</label>
                                    <select id="ConsumeMarihuana" name="ConsumeMarihuana" class="form-control" required>
                                        <option value="sipoco">Sí, poco</option>
                                        <option value="simucho">Sí, mucho</option>
                                        <option value="no">No</option>
                                        <option value="noobservado">No Observado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="ConsumeOtrasDrogas">Consume Otras Drogas:</label>
                                    <select id="ConsumeOtrasDrogas" name="ConsumeOtrasDrogas" class="form-control" required>
                                        <option value="sipoco">Sí, poco</option>
                                        <option value="simucho">Sí, mucho</option>
                                        <option value="no">No</option>
                                        <option value="noobservado">No Observado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="ConsumoAlcoholExesivo">Consumo Alcohol Excesivo:</label>
                                    <select id="ConsumoAlcoholExesivo" name="ConsumoAlcoholExesivo" class="form-control" required>
                                        <option value="sipoco">Sí, poco</option>
                                        <option value="simucho">Sí, mucho</option>
                                        <option value="no">No</option>
                                        <option value="noobservado">No Observado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="AmenazaPolicia">Amenaza con la Policía:</label>
                                    <select id="AmenazaPolicia" name="AmenazaPolicia" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="amenazaExtranjeros">Amenaza con Extranjeros:</label>
                                    <select id="amenazaExtranjeros" name="amenazaExtranjeros" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="Destrozos">Destrozos:</label>
                                    <select id="Destrozos" name="Destrozos" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="GritaEInsultaArrendador">Grita e Insulta al Arrendador:</label>
                                    <select id="GritaEInsultaArrendador" name="GritaEInsultaArrendador" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="Robos">Robos:</label>
                                    <select id="Robos" name="Robos" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="BuenasRelacionesPasajeros">Buenas Relaciones con Pasajeros:</label>
                                    <select id="BuenasRelacionesPasajeros" name="BuenasRelacionesPasajeros" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="AvisaConAntisipaciínRetirada">Avisa con Anticipación la Retirada:</label>
                                    <select id="AvisaConAntisipaciínRetirada" name="AvisaConAntisipaciínRetirada" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="Independiante">Independiente:</label>
                                    <select id="Independiante" name="Independiante" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="privado">Privado:</label>
                                    <select id="privado" name="privado" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="llavero">Llavero:</label>
                                    <select id="llavero" name="llavero" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="MeteGenteAgena">Mete Gente Ajena:</label>
                                    <select id="MeteGenteAgena" name="MeteGenteAgena" class="form-control" required>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="comentario">Comentario:</label>
                                    <textarea id="comentario" name="comentario" class="form-control" placeholder="Ingrese un comentario breve" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Add Report</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        $(document).on('submit', '#reportForm', this.handleSubmit);
        $(document).on('blur', '#telefono', this.formatPhoneNumbers);
        $(document).on('click', '.addPhoneNumberButton', this.addPhoneNumberField);
        $(document).on('click', '.addNickNameButton', this.addNickNameField);
    },

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        reportModel.addReport(Object.fromEntries(formData))
            .then(response => {
                alert('Reporte creado exitosamente');
                $('#reportForm')[0].reset();
                $('#reportModal').modal('hide');
            })
            .catch(error => {
                alert('Error al crear el reporte');
                console.error(error);
            });
    },

    formatPhoneNumbers(e) {
        const input = e.target;
        const phones = input.value.split(',').map(p => p.trim()).filter(p => p);
        input.value = phones.join(', ');
    },

    addPhoneNumberField(e) {
        $(e.target).prop('disabled', true);
        const phoneNumberField = `
            <div class="input-group mb-2">
                <input type="tel" name="telefono[]" class="form-control" placeholder="Ingrese el número de teléfono" required>
                <div class="input-group-append">
                    <button type="button" class="btn btn-secondary btn-sm addPhoneNumberButton">Agregar Teléfono</button>
                </div>
            </div>
        `;
        $('#telefonoContainer').append(phoneNumberField);
    },

    addNickNameField(e) {
        $(e.target).prop('disabled', true);
        const nickNameField = `
            <div class="input-group mb-2">
                <input type="text" name="nickNames[]" class="form-control" placeholder="Ingresa los nombres de fantasía" required>
                <div class="input-group-append">
                    <button type="button" class="btn btn-secondary btn-sm addNickNameButton">Agregar Nickname</button>
                </div>
            </div>
        `;
        $('#nickNamesContainer').append(nickNameField);
    }
};