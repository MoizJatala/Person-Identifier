const express = require('express');
const router = express.Router();
const userController = require('../controllers/adminController');
const jwt = require('jsonwebtoken')
const verifyuser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.json("Token is missing");
    } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          return res.json("Error with token");
        } else {
          req.user = decoded; // Attach user information to the request object
          next();
        }
      });
    }
  };

// Route to get all users
router.get('/adminpanel',verifyuser, userController.getAllUsers);

// Route to delete a specific user by ID
router.delete('/admindelete/:id',verifyuser, userController.deleteUser);

// Route to update user information
router.put('/adminpanel/edit',verifyuser, userController.updateUser);

module.exports = router;
