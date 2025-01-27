const { admin, db } = require('../database/firebaseconfig');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

exports.validateRegister = (req, res, next) => {
  // Validación de registro
  next();
};

exports.validateLogin = (req, res, next) => {
  // Validación de login
  next();
};

exports.handleValidationErrors = (req, res, next) => {
  // Manejo de errores de validación
  next();
};

module.exports = { authenticate, authorize };
