const express = require('express');
const { submitForm } = require('../controllers/formcontroller');
const { handleValidationErrors } = require('../models/formModel');

const router = express.Router();

router.post('/submit-form', handleValidationErrors, submitForm);

module.exports = router;
