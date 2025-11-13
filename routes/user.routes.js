const express = require('express');
const router = express.Router();
const checkLoginAuth = require('../middleware/check-login-auth');
const getAllUsers = require('../controllers/user/getall');
const getUserById = require('../controllers/user/getone');
const updateUser = require('../controllers/user/update');
const deleteUser = require('../controllers/user/delete');

router.get('/', checkLoginAuth, getAllUsers);
router.get('/:id', checkLoginAuth, getUserById);
router.patch('/:id', checkLoginAuth, updateUser);
router.delete('/:id', checkLoginAuth, deleteUser);

module.exports = router;
