const express = require('express');
const router = express.Router();
const checkLoginAuth = require('../middleware/check-login-auth');
const userController = require('../controllers/user/user.controller');
const user = require('../model/user');

router.get('/', checkLoginAuth, userController.getAllUsers);
router.patch('/me', checkLoginAuth, userController.updateMe);
router.get('/:id', checkLoginAuth, userController.getOneUser);
router.patch('/:id', checkLoginAuth, userController.updateUser);
router.delete('/:id', checkLoginAuth, userController.deleteUser);

module.exports = router;
