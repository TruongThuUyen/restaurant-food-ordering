const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

    city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'moderator'],
      required: false,
    },

    dob: {
      type: Date,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    address: String,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
