const User = require('../../model/user');

module.exports = async function updateUser(req, res) {
  try {
    const disallowedFields = ['password', 'role'];
    disallowedFields.forEach((field) => delete req.body[field]);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password -__v');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};
