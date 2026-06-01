// backend/src/routes/runRoutes.js
const express = require('express');
const router = express.Router();
// Import all the tools from the controller!
const { submitRun, getAllRuns, toggleKudos, addComment } = require('../controllers/runController');

// Get the feed
router.get('/', getAllRuns);

// Save a run
router.post('/', submitRun);

// ✨ NEW: Toggle a Kudos on a specific run
router.post('/:id/kudos', toggleKudos);

// ✨ NEW: Add a comment to a specific run
router.post('/:id/comments', addComment);

module.exports = router;