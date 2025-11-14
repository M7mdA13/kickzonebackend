const User = require("../model/user");

// 🧩 Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "All users retrieved", data: users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🧍 Admin or user can see their own profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile fetched", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
