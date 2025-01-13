const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('birthdate').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida')
];

const validateLogin = [
  check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('password').not().isEmpty().withMessage('La contraseña es obligatoria')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRegister, validateLogin, handleValidationErrors };
