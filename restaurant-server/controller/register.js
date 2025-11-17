const User = require('../models/User');
const generateToken = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { fullName, email, password, city, address, phone } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      password,
      email,
      city,
      address,
      phone,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = register;
