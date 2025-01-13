const express = require('express');
const { submitForm } = require('../controlador/formController');
const { validateForm, handleValidationErrors } = require('../modelo/formModel');

const router = express.Router();

router.post('/submit-form', validateForm, handleValidationErrors, submitForm);

module.exports = router;
