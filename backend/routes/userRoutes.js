const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getAllUsers, 
  updateUserPermissions, 
  deleteUser 
} = require('../controllers/userController');

// All routes are protected and require admin role
router.get('/', protect, getAllUsers);
router.put('/:id/permissions', protect, updateUserPermissions);
router.delete('/:id', protect, deleteUser);

module.exports = router;
