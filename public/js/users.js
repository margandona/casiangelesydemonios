$(document).ready(function() {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

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

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return firebase.firestore().collection('users').doc(user.uid).set({
                    name,
                    username,
                    city,
                    email,
                    birthdate,
                    nacionalidad
                });
            })
            .then(() => {
                alert('User registered successfully');
                $('#registerForm')[0].reset(); // Reset the form after successful submission
                $('#registerModal').modal('hide'); // Hide the modal
            })
            .catch((error) => {
                console.error('Error registering user:', error.message);
                alert('Error registering user: ' + error.message);
            });
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        console.log('Logging in user:', { email, password }); // Add logging

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert('User logged in successfully');
                $('#loginForm')[0].reset(); // Reset the form after successful submission
                $('#loginModal').modal('hide'); // Hide the modal
                $('#informeContainer').show(); // Show the informe container
                $('#logoutButton').show(); // Show the logout button
                $('#showRegisterButton').hide(); // Hide the register button
                $('#showLoginButton').hide(); // Hide the login button
            })
            .catch((error) => {
                console.error('Error logging in user:', error.message);
                alert('Error logging in user: ' + error.message);
            });
    });

    $('#logoutButton').on('click', function() {
        firebase.auth().signOut().then(() => {
            $('#informeContainer').hide(); // Hide the informe container
            $('#logoutButton').hide(); // Hide the logout button
            $('#showRegisterButton').show(); // Show the register button
            $('#showLoginButton').show(); // Show the login button
            alert('User logged out successfully');
        });
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $('#informeContainer').show();
            $('#logoutButton').show();
            $('#showRegisterButton').hide();
            $('#showLoginButton').hide();
        } else {
            $('#informeContainer').hide();
            $('#logoutButton').hide();
            $('#showRegisterButton').show();
            $('#showLoginButton').show();
        }
    });

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
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                alert('User logged in with Google');
            })
            .catch((error) => {
                console.error('Error logging in with Google:', error.message);
                alert('Error logging in with Google: ' + error.message);
            });
    });
});
