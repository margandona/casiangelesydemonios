$(document).ready(function() {
    loadView('home');

    $('#mainContent').on('click', '#showRegisterButton', function() {
        loadView('register');
    });

    $('#mainContent').on('click', '#showLoginButton', function() {
        loadView('login');
    });

    $('#mainContent').on('click', '#logoutButton', function() {
        // ...existing code for logout...
    });
});

function loadView(viewName) {
    $('#mainContent').load(`js/views/${viewName}.html`);
}
