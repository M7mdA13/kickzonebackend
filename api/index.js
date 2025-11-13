const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const v1Router = require("./routes/routes"); 
const app = express();

dotenv.config();


const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL || process.env.DB_url; 


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => console.error(" Database connection error:", error.message));


app.use(express.json());


app.use("/api/v1", v1Router);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found", data: null });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

module.exports = app;
