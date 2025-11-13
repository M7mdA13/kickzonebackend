const mongoose = require("mongoose");

// ✅ تعريف الـ Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // ❗ يمنع إظهار الباسورد عند جلب المستخدم
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favouritePosition: {
      type: String,
      enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
      default: null,
    },
    preferredFoot: {
      type: String,
      enum: ["Left", "Right", "Both"],
      default: null,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
      min: [0, "Matches played cannot be negative"],
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

// ✅ منع ظهور بعض الحقول الحساسة في JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
