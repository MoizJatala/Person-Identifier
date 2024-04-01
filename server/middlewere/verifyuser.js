const verifyUser = (req, res, next) => {
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