const express = require('express');
const router = express.Router();
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
const userController = require("../controllers/userController");

// POST request to update user profile
router.post('/profile', verifyuser, userController.updateUserDetails);

// GET request to retrieve user profile
router.get('/profile', verifyuser, userController.getUserDetails);

module.exports = router;
