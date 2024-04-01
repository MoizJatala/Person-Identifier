const UserModel = require('../models/usermodel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginController = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            console.log(user._id)
            const token = jwt.sign({ id:user._id, email: user.email, role: user.role, password: user.password, name: user.name },
              "jwt-secret-key", { expiresIn: '1d' })

            // Set the cookie before sending the response
            res.cookie('token', token);

            // Send the JSON response
            return res.json({
              status: "Success",
              token: token,
              user: {
                name: user.name,
                email: user.email,
                password: password,
                role: user.role,
              }
            });

          } else {
            return res.json("The password is incorrect")
          }
        })
      } else {
        return res.json("No record existed")
      }
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    });
};

module.exports = loginController;
