const jwt = require("jsonwebtoken");

module.exports = (requiredRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decodedToken.role;

      if (!requiredRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
      }

      req.userData = { userId: decodedToken.userId, role: decodedToken.role };
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Authentication failed", error: error.message });
    }
  };
};
