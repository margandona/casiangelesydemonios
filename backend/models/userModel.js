const { check, validationResult } = require('express-validator');

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = [
  check('email').matches(emailRegex).withMessage('Debe ser un correo electrónico válido'),
  check('password').matches(passwordRegex).withMessage('La contraseña debe tener al menos 1 letra mayúscula, 1 número, 1 símbolo y una longitud mínima de 8 caracteres'),
  check('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
  check('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser admin o user'),
  check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('username').not().isEmpty().withMessage('El nick de usuario es obligatorio'),
  check('city').not().isEmpty().withMessage('La ciudad es obligatoria'),
  check('birthdate').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida')
];

const validateUpdateUser = [
  check('email').optional().matches(emailRegex).withMessage('Debe ser un correo electrónico válido'),
  check('password').optional().matches(passwordRegex).withMessage('La contraseña debe tener al menos 1 letra mayúscula, 1 número, 1 símbolo y una longitud mínima de 8 caracteres'),
  check('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser admin o user'),
  check('name').optional().not().isEmpty().withMessage('El nombre es obligatorio'),
  check('username').optional().not().isEmpty().withMessage('El nick de usuario es obligatorio'),
  check('city').optional().not().isEmpty().withMessage('La ciudad es obligatoria'),
  check('birthdate').optional().isDate().withMessage('La fecha de nacimiento debe ser una fecha válida')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validateUpdateUser, handleValidationErrors };
