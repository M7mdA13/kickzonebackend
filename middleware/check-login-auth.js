const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1️⃣ التحقق من وجود الهيدر
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided!" });
    }

    // 2️⃣ استخراج التوكن
    const token = authHeader.split(" ")[1];

    // 3️⃣ التحقق من التوكن باستخدام المفتاح السري
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ حفظ بيانات المستخدم في الطلب (للاستخدام لاحقًا)
    req.userData = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

    // 5️⃣ السماح بالمتابعة
    next();

  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    res.status(401).json({ message: "Authentication failed!" });
  }
};
