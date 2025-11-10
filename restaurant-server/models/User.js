const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },

    fullName: {
      type: String,
      required: false,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },

    dob: Date,
    address: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
