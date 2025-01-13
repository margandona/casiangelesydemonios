const { admin, db } = require('../../database/firebaseconfig');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No se proporcionó un token de autenticación');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    res.status(401).send(`Token de autenticación inválido: ${error.message}`);
  }
};

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      const userRole = userDoc.data().role;

      if (!roles.includes(userRole)) {
        return res.status(403).send('No tienes permiso para acceder a este recurso');
      }

      next();
    } catch (error) {
      console.error('Error al verificar el rol del usuario:', error.message);
      res.status(500).send(`Error al verificar el rol del usuario: ${error.message}`);
    }
  };
};

module.exports = { authenticate, authorize };
