const express = require("express");
const mongoose = require("mongoose");
const v1Router = require('../routes/routes');
const app = express();

require("dotenv").config();

//console.log(process.env.PORT);

const port = process.env.PORT || 7000;

const DB_url = process.env.DB_url;

mongoose
  .connect(DB_url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error(`Database connection error: ${error.message}`);
  });

app.use(express.json());
app.use('/api/v1', v1Router);

app.use((req, res) => {
  res.status(404).json({ message: "wrong routing", data: null });
});

app.listen(port, (err) => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
