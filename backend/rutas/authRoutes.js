const express = require('express');
const { register, login } = require('../controlador/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../modelo/authModel');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

module.exports = router;
