const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    birthday: {
      type: Date,
    },
    role: {
      type: String,
      default: "user",
    },
    favouritePosition: {
      type: String,
      default: null,
    },
    preferredFoot: {
      type: String,
      default: null,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
    },
    coverPhoto: {
      type: String,
      default:
        "https://tokystorage.s3.amazonaws.com/images/default-cover.png",
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
