const { admin, db } = require('../database/firebaseconfig');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password, name, birthdate } = req.body;

  try {
    console.log('Registrando usuario:', email);
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const userData = {
      email,
      role: 'user', // Asignar automáticamente el rol de 'user'
      name,
      birthdate,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    res.status(201).json({ uid: userRecord.uid, ...userData });
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).send(`Error al registrar el usuario: ${error.message}`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Iniciando sesión para:', email);
    const userRecord = await admin.auth().getUserByEmail(email);
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    const userRole = userDoc.data().role;

    const token = jwt.sign({ uid: userRecord.uid, role: userRole }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).send(`Error al iniciar sesión: ${error.message}`);
  }
};

module.exports = { register, login };
