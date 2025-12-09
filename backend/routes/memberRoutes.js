const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

// All routes are protected
router.route('/').get(protect, getMembers).post(protect, createMember);
router.route('/:id').put(protect, updateMember).delete(protect, deleteMember);

module.exports = router;
