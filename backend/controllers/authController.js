// Importar los módulos y configuraciones necesarios
const { admin, db } = require('../database/firebaseconfig');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const register = async (req, res) => {
  // Extraer los detalles del usuario del cuerpo de la solicitud
  const { email, password, name, username, city, birthdate, nacionalidad } = req.body;

  try {
    console.log('Registrando usuario:', email);
    // Crear un nuevo usuario en Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Preparar los datos del usuario para almacenarlos en Firestore
    const userData = {
      email,
      role: 'user', // Asignar automáticamente el rol de 'user'
      name,
      username,
      city,
      birthdate,
      nacionalidad,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Almacenar los datos del usuario en Firestore
    await db.collection('users').doc(userRecord.uid).set(userData);

    // Responder con los datos del usuario creado
    res.status(201).json({ uid: userRecord.uid, ...userData });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    // Manejar errores durante el registro del usuario
    res.status(500).send(`Error al registrar el usuario: ${error.message}`);
  }
};

// Iniciar sesión de un usuario existente
const login = async (req, res) => {
  // Extraer los detalles de inicio de sesión del cuerpo de la solicitud
  const { email, password } = req.body;

  try {
    console.log('Iniciando sesión para:', email);
    // Recuperar el registro del usuario de Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);
    // Recuperar el documento del usuario de Firestore
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    const userRole = userDoc.data().role;

    console.log('Usuario encontrado:', userRecord);
    console.log('Documento del usuario:', userDoc.data());

    // Generate a custom token
    const customToken = await admin.auth().createCustomToken(userRecord.uid, { role: userRole });

    // Respond with the custom token
    res.status(200).json({ customToken });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    // Manejar errores durante el inicio de sesión del usuario
    res.status(500).json({ error: `Error al iniciar sesión: ${error.message}` });
  }
};

// Exportar las funciones de registro e inicio de sesión
module.exports = { register, login };

// ...other methods...
