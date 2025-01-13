const express = require('express');
const { createUser, getUser, updateUser, deleteUser, getMe, getAllUsers } = require('../controlador/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateUser, validateUpdateUser, handleValidationErrors } = require('../modelo/userModel');

const router = express.Router();

router.post('/users', authenticate, authorize(['admin']), validateUser, handleValidationErrors, createUser); // Ruta para crear un usuario
router.get('/users/:uid', authenticate, authorize(['admin']), getUser); // Permitir que los administradores accedan a los datos de cualquier usuario
router.put('/users/:uid', authenticate, authorize(['admin', 'user']), validateUpdateUser, handleValidationErrors, updateUser); // Permitir que los administradores y usuarios actualicen sus propios datos
router.delete('/users/:uid', authenticate, authorize(['admin']), deleteUser);
router.get('/users/me', authenticate, getMe); // Ruta para obtener los datos del usuario autenticado
router.get('/users', authenticate, authorize(['admin']), getAllUsers);

module.exports = router;
