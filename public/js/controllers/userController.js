document.addEventListener('DOMContentLoaded', function() {
    const userModel = {
        register: async function(userData) {
            // Simulate an API call to register the user
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (userData.email && userData.password) {
                        resolve('User registered successfully');
                    } else {
                        reject('Registration failed');
                    }
                }, 1000);
            });
        },
        login: async function(userData) {
            // Simulate an API call to login the user
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (userData.email && userData.password) {
                        resolve('User logged in successfully');
                    } else {
                        reject('Login failed');
                    }
                }, 1000);
            });
        },
        loginWithGoogle: async function() {
            // Simulate an API call to login with Google
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('User logged in with Google successfully');
                }, 1000);
            });
        },
        logout: async function() {
            // Simulate an API call to logout the user
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('User logged out successfully');
                }, 1000);
            });
        }
    };

    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        try {
            const message = await userModel.register({ email, password });
            alert(message);
            window.location.href = 'mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const message = await userModel.login({ email, password });
            alert(message);
            window.location.href = 'mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('googleLoginButton').addEventListener('click', async function() {
        try {
            const message = await userModel.loginWithGoogle();
            alert(message);
            window.location.href = 'mainView.html'; // Redirigir al dashboard
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('logoutButton').addEventListener('click', async function() {
        try {
            const message = await userModel.logout();
            alert(message);
            window.location.href = 'index.html'; // Redirigir a la página de inicio
        } catch (error) {
            alert(error);
        }
    });
});