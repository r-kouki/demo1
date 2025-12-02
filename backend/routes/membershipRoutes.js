const express = require('express');
const router = express.Router();
const {
  getMemberships,
  createMembership,
  deleteMembership,
} = require('../controllers/membershipController');

router.route('/').get(getMemberships).post(createMembership);
router.route('/:id').delete(deleteMembership);

module.exports = router;
