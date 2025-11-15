const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', feedbackController.createFeedback); // public

// Admin routes
router.get('/', protect, adminOnly, feedbackController.getAllFeedback);
router.get('/statistics', protect, adminOnly, feedbackController.getStatistics);
router.put('/:id', protect, adminOnly, feedbackController.updateFeedback);
router.delete('/:id', protect, adminOnly, feedbackController.deleteFeedback);

module.exports = router;
