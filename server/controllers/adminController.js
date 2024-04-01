const UserModel = require('../models/usermodel');

// Controller to get all users
const getAllUsers = (req, res) => {
  UserModel.find()
    .then(users => {
      return res.json(users);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    });
};

// Controller to delete a specific user by ID
const deleteUser = (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  UserModel.findByIdAndDelete(userId)
    .then(user => {
      if (!user) {
        return res.json("User not found");
      }
      return res.json("User deleted successfully");
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    });
};

// Controller to update user information
const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then(user => {
      if (!user) {
        return res.json("User not found");
      }
      return res.json("User updated successfully");
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    });
};

module.exports = { getAllUsers, deleteUser, updateUser };
