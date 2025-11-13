const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided!" });
    }

   
    const token = authHeader.split(" ")[1];

  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    
    req.userData = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

  
    next();

  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    res.status(401).json({ message: "Authentication failed!" });
  }
};
