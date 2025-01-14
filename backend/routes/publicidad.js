const express = require('express');
const router = express.Router();
const {
    crearPublicidad,
    obtenerPublicidades,
    obtenerPublicidadPorId,
    obtenerPublicidadesPorEstado,
    obtenerPublicidadesPorCategoria,
    obtenerPublicidadesPorPrioridad,
    editarPublicidad,
    archivarPublicidad,
    eliminarPublicidad
} = require('../controllers/publicidadController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorize(['admin']), crearPublicidad);
router.get('/', authenticate, authorize(['admin']), obtenerPublicidades);
router.get('/:id', authenticate, authorize(['admin']), obtenerPublicidadPorId);
router.get('/estado/:estado', authenticate, authorize(['admin']), obtenerPublicidadesPorEstado);
router.get('/categoria/:categoria', authenticate, authorize(['admin']), obtenerPublicidadesPorCategoria);
router.get('/prioridad/:prioridad', authenticate, authorize(['admin']), obtenerPublicidadesPorPrioridad);
router.put('/:id', authenticate, authorize(['admin']), editarPublicidad);
router.patch('/:id/archivar', authenticate, authorize(['admin']), archivarPublicidad);
router.delete('/:id', authenticate, authorize(['admin']), eliminarPublicidad);

module.exports = router;
