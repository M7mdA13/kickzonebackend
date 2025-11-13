const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const v1Router = require("./routes/routes"); // ✅ عدّل المسار حسب مكان الملف
const app = express();

dotenv.config();

// ✅ استخدم أسماء المتغيرات بنفس شكلها في .env
const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL || process.env.DB_url; // دعم الحالتين

// ✅ اتصال بقاعدة البيانات
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Database connection error:", error.message));

// ✅ Middlewares
app.use(express.json());

// ✅ Routes
app.use("/api/v1", v1Router);

// ✅ Route not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", data: null });
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
