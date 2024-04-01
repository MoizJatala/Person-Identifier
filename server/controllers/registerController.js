const UserModel = require('../models/usermodel');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate name, email, and password using Mongoose schema
    const user = new UserModel({ name, email, password });
    console.log(user)
    await user.validate();

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please choose a different email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await UserModel.create({ name, email, password: hashedPassword });
    console.log(newUser)
    return res.json({ status:"Success",message: "User registered successfully" });

  } catch (error) {
    // Handle validation errors and other errors
    if (error.name === 'ValidationError') {
      // Validation error occurred
      const errorMessages = Object.values(error.errors).map(error => error.message);
      return res.status(400).json({ error: errorMessages });
    } else {
      // Other errors
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = registerController;
