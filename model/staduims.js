const mongoose = require("mongoose");

const stadiumsschema = new mongoose.schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: String,
    imageurl: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Stadiums", stadiumsschema);
