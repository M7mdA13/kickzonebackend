const User = require('../../model/user');

module.exports = async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password -__v');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};
