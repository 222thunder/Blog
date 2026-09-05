const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },   // optional – signup only collects email + password
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true }, // bcrypt hash, never plaintext
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
