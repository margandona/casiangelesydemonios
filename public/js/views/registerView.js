const RegisterView = {
    render() {
        return `
            <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerModalLabel">Registrarse</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="registerForm">
                                <div class="form-group">
                                    <label for="registerFullName">Nombre Completo:</label>
                                    <input type="text" id="registerFullName" name="name" class="form-control" placeholder="Ingrese su nombre completo" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerUsername">Nick de Usuario:</label>
                                    <input type="text" id="registerUsername" name="username" class="form-control" placeholder="Ingrese su nick de usuario" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerCity">Ciudad:</label>
                                    <input type="text" id="registerCity" name="city" class="form-control" placeholder="Ingrese su ciudad" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerEmail">Correo Electrónico:</label>
                                    <input type="email" id="registerEmail" name="email" class="form-control" placeholder="Ingrese su correo electrónico" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerBirthdate">Fecha de Nacimiento:</label>
                                    <input type="date" id="registerBirthdate" name="birthdate" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerNacionalidad">Nacionalidad:</label>
                                    <input type="text" id="registerNacionalidad" name="nacionalidad" class="form-control" placeholder="Ingrese su nacionalidad" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerPassword">Contraseña:</label>
                                    <input type="password" id="registerPassword" name="password" class="form-control" placeholder="Ingrese su contraseña" required>
                                </div>
                                <div class="form-group">
                                    <label for="registerConfirmPassword">Confirmar Contraseña:</label>
                                    <input type="password" id="registerConfirmPassword" name="confirmPassword" class="form-control" placeholder="Confirme su contraseña" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Registrarse</button>
                                <button id="googleSignInButton" class="btn btn-danger">Registrarse con Google</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        $(document).on('submit', '#registerForm', this.handleRegister.bind(this));
        $(document).on('click', '#googleSignInButton', this.handleGoogleSignIn.bind(this));
    },

    async handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        if (userData.password !== userData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const message = await userModel.register(userData);
            alert(message);
            $('#registerModal').modal('hide');
            window.location.href = 'mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert('Error al registrar usuario');
            console.error(error);
        }
    },

    async handleGoogleSignIn() {
        try {
            const message = await userModel.loginWithGoogle();
            alert(message);
            $('#registerModal').modal('hide');
            window.location.href = 'mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert('Error al iniciar sesión con Google');
            console.error(error);
        }
    }
};