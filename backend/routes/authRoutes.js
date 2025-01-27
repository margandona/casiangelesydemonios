const express = require('express');
const router = express.Router();

// Import the necessary controllers
const authController = require('../controllers/authController');

// Define routes
router.post('/login', authController.login);
router.post('/register', authController.register);
// ...other routes...

module.exports = router;
