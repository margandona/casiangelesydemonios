const express = require('express');
const { createUser, getUser, updateUser, deleteUser, getMe, getAllUsers } = require('../controlador/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateUser, handleValidationErrors } = require('../modelo/userModel');

const router = express.Router();

router.post('/users', authenticate, authorize(['admin']), validateUser, handleValidationErrors, createUser);
router.get('/users/:uid', authenticate, authorize(['admin']), getUser);
router.put('/users/:uid', authenticate, authorize(['admin']), validateUser, handleValidationErrors, updateUser);
router.delete('/users/:uid', authenticate, authorize(['admin']), deleteUser);
router.get('/users/me', authenticate, getMe);
router.get('/users', authenticate, authorize(['admin']), getAllUsers);

module.exports = router;
