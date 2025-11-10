const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const checkLoginAuth = require('../middleware/check-login-auth');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Protected route example
router.get('/me', checkLoginAuth, (req, res) => {
    res.json({ message: 'This will be a protected route' });
});

module.exports = router;