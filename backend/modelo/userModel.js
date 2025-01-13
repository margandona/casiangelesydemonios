const { check, validationResult } = require('express-validator');

const validateUser = [
  check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('role').isIn(['admin', 'user']).withMessage('El rol debe ser admin o user'),
  check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('birthdate').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, handleValidationErrors };
