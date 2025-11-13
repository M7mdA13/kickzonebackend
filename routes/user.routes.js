const express = require('express');
const router = express.Router();
const User = require('../models/user'); // ✅ استدعاء الـ model
const checkLoginAuth = require('../middleware/check-login-auth'); // لو عندك ميدل وير

// ✅ Get All Users
router.get('/', checkLoginAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password -__v'); // نحذف الباسورد و __v
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// ✅ Get One User
router.get('/:id', checkLoginAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

// ✅ Update User
router.patch('/:id', checkLoginAuth, async (req, res) => {
  try {
    // منع تعديل الباسورد أو الدور هنا لو مش مطلوب
    const disallowedFields = ['password', 'role'];
    disallowedFields.forEach((field) => delete req.body[field]);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password -__v');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

// ✅ Delete User
router.delete('/:id', checkLoginAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;
