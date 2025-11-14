const express = require("express");
const router = express.Router();

const checkLoginAuth = require('../middleware/check-login-auth');
const checkRoleAuth = require('../middleware/check-role-auth');
const userController = require('../controllers/user/user.controller');

// ==========================
// 🔐 Admin Only Routes
// ==========================
router.get(
  '/',
  checkLoginAuth,
  checkRoleAuth(['admin']),
  userController.getAllUsers
);

router.delete(
  '/:id',
  checkLoginAuth,
  checkRoleAuth(['admin']),
  userController.deleteUser
);

// ==========================
// 👤 Logged-in User Routes
// ==========================

// User updates their own profile
router.patch(
  '/me',
  checkLoginAuth,
  checkRoleAuth(['admin', 'user']),
  userController.updateMe
);

// Admin or User can get a user profile by ID
router.get(
  '/:id',
  checkLoginAuth,
  checkRoleAuth(['admin', 'user']),
  userController.getOneUser
);

// Admin or user can update a user by ID
router.patch(
  '/:id',
  checkLoginAuth,
  checkRoleAuth(['admin', 'user']),
  userController.updateUser
);

module.exports = router;
