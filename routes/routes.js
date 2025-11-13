const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const stadiumRoutes = require('./stadium.routes');
// const cartRoutes = require('./cart.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/stadiums', stadiumRoutes);
// router.use('/cart', cartRoutes);

module.exports = router;