const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Sequelize model for your cached user data

const authenticate = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  if (token.startsWith("Token ")) {
    token = token.slice(6); // Remove the "Token " part (6 characters)
  }

  console.log("Token", token);
  try {
    const user = await User.findOne({ where: { django_token: token } });

    if (user) {
      req.user = user;
      return next();
    }

    // If not found in Django token, try validating as an Express token
    try {
      const decoded = jwt.verify(token, "secret-token-generation");
      const expressUser = await User.findOne({
        where: { username: decoded.username },
      });

      if (expressUser) {
        req.user = expressUser; // Attach user info to the request
        return next();
      } else {
        return res
          .status(403)
          .json({ message: "Invalid token: User not found." });
      }
    } catch (expressTokenError) {
      return res.status(403).json({ message: "Invalid token." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = authenticate;
