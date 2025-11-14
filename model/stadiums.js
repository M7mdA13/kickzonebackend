const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stadium", stadiumSchema);
