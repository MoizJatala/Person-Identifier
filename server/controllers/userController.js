const UserModel = require('../models/usermodel');


const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you pass the userId as a parameter
    const User = await UserModel.findById(userId);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.json({
      status: "Success",
      user: {
        name: User.name,
        email: User.email,
        role: User.role,
      }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserDetails = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, email} = req.body;
      // Find the user by ID and update the details
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { name, email},
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user details
      res.json({
        status: "Success"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Add more controller functions as needed
  
  module.exports = {
    getUserDetails,
    updateUserDetails,
  };