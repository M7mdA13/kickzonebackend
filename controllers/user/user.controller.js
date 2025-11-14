const updateUser = require("./update");
const updateMe = require("./updateme");
const getAllUsers = require("./getall");
const getOneUser = require("./getone");
const deleteUser = require("./delete");

// Export them all in one object
module.exports = {
  updateUser,
  updateMe,
  getAllUsers,
  getOneUser,
  deleteUser,
};
