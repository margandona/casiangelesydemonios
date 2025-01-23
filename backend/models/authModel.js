const { check, validationResult } = require('express-validator');

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = [
  check('email').matches(emailRegex).withMessage('Debe ser un correo electrónico válido'),
  check('password').matches(passwordRegex).withMessage('La contraseña debe tener al menos 1 letra mayúscula, 1 número, 1 símbolo y una longitud mínima de 8 caracteres'),
  check('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
  check('name').not().isEmpty().withMessage('El nombre completo es obligatorio'),
  check('username').not().isEmpty().withMessage('El nick de usuario es obligatorio'),
  check('city').not().isEmpty().withMessage('La ciudad es obligatoria'),
  check('birthdate').isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  check('nacionalidad').not().isEmpty().withMessage('La nacionalidad es obligatoria')
];

const validateLogin = [
  check('email').matches(emailRegex).withMessage('Debe ser un correo electrónico válido'),
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
