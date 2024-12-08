const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  p_timer: {
    type: Number,
    default: 25,
  },
  p_break: {
    type: Number,
    default: 5,
  },
  p_long_break: {
    type: Number,
    default: 30,
  },
  uni: {
    type: [String],
    default: [],
  },
});

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema, "users");
