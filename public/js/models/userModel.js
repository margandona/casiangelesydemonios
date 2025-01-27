const userModel = {
    register: async function(userData) {
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },

    login: async function(userData) {
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },

    loginWithGoogle: async function() {
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/loginWithGoogle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            throw error;
        }
    },

    logout: async function() {
        try {
            const response = await fetch('https://casiangelesydemonios.web.app/api/logout', {
                method: 'POST'
            });
            return await response.json();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    }
};