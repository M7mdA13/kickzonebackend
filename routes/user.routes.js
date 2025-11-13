const express = require("express");
const router = express.Router();

const checkLoginAuth = require("../middleware/check-login-auth");
const checkRoleAuth = require("../middleware/check-role-auth");
const userController = require("../controllers/userController");

// ✅ Only admin can view all users
router.get(
  "/",
  checkLoginAuth,
  checkRoleAuth(["admin"]),
  userController.getAllUsers
);

// ✅ Admin and user can view their own profile
router.get(
  "/me",
  checkLoginAuth,
  checkRoleAuth(["admin", "user"]),
  userController.getMyProfile
);

module.exports = router;
