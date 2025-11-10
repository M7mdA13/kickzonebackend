const mongoose = require("mongoose");

const cartschema = new mongoose.schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stadiums: [
      {
        staduimId: { type: mongoose.Schema.Types.ObjectId, ref: "Stadiums" },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartschema);
