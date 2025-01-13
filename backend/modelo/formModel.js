const { check, validationResult } = require('express-validator');

const validateForm = [
  check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('message').not().isEmpty().withMessage('El mensaje es obligatorio')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateForm, handleValidationErrors };
