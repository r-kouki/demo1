const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMemberships,
  createMembership,
  deleteMembership,
} = require('../controllers/membershipController');

// All routes are protected
router.route('/').get(protect, getMemberships).post(protect, createMembership);
router.route('/:id').delete(protect, deleteMembership);

module.exports = router;
