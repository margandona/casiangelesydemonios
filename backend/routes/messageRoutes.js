const express = require('express');
const { getMessages, getMessageById, deleteMessage, archiveMessage, prioritizeMessage } = require('../controllers/messageController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/messages', authenticate, authorize(['admin']), getMessages);
router.get('/messages/:id', authenticate, authorize(['admin']), getMessageById);
router.delete('/messages/:id', authenticate, authorize(['admin']), deleteMessage);
router.put('/messages/:id/archive', authenticate, authorize(['admin']), archiveMessage);
router.put('/messages/:id/prioritize', authenticate, authorize(['admin']), prioritizeMessage);

module.exports = router;
