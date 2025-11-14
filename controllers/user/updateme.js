const User = require('../../model/user');

module.exports = async (req, res) => {
  try {
    // 1. Get user ID from your auth middleware
    const userId = req.userData.userId;

    // 2. Filter out fields a user shouldn't change
    delete req.body.role;
    delete req.body.password;
    delete req.body.email; 

    // 3. Find by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // Return the new, updated document
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};