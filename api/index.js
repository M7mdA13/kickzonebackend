const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const v1Router = require("../routes/routes");
const StadiumRoutes = require("../routes/stadium");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL || process.env.DB_url;

// Connect to MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Database connection error:", error.message));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/stadiums", StadiumRoutes);  // Haneen's route
app.use("/api/v1", v1Router);         // master route

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", data: null });
});

// Start server
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});

module.exports = app;