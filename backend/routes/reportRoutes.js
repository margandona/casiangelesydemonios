const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/reports', authenticate, authorize(['admin', 'user']), reportController.createReport);
router.get('/reports', authenticate, authorize(['admin']), reportController.getAllReports);
router.get('/reports/search', authenticate, authorize(['admin', 'user']), reportController.searchReports);
router.put('/reports/:id', authenticate, authorize(['admin']), reportController.updateReport);
router.delete('/reports/:id', authenticate, authorize(['admin']), reportController.deleteReport);
router.get('/reports/:id', authenticate, authorize(['admin', 'user']), reportController.getReport);

module.exports = router;