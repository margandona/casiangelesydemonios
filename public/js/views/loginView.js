const LoginView = {
    render() {
        return `
            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Iniciar Sesión</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="loginForm">
                                <div class="form-group">
                                    <label for="loginEmail">Correo Electrónico:</label>
                                    <input type="email" id="loginEmail" name="email" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="loginPassword">Contraseña:</label>
                                    <input type="password" id="loginPassword" name="password" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                            </form>
                            <button id="googleSignInButton" class="btn btn-danger">Iniciar sesión con Google</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        $(document).on('submit', '#loginForm', this.handleLogin.bind(this));
        $(document).on('click', '#googleSignInButton', this.handleGoogleSignIn.bind(this));
    },

    async handleLogin(e) {
        e.preventDefault();
        const formData = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };
        try {
            const message = await userModel.login(formData);
            alert(message);
            $('#loginModal').modal('hide');
            window.location.href = '/mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert('Error al iniciar sesión');
            console.error(error);
        }
    },

    async handleGoogleSignIn() {
        try {
            const message = await userModel.loginWithGoogle();
            alert(message);
            $('#loginModal').modal('hide');
            window.location.href = '/mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert('Error al iniciar sesión con Google');
            console.error(error);
        }
    }
};
