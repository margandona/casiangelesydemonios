const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/reports', reportController.getAllReports);
router.post('/reports', reportController.addReport);
router.get('/reports/:id', reportController.getReportById);
router.put('/reports/:id', reportController.updateReport);
router.delete('/reports/:id', reportController.deleteReport);

module.exports = router;