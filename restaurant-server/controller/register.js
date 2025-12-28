const User = require('../models/User');
const generateToken = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { fullName, email, password, city, address } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ status: 4001, success: false, message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      password,
      email,
      city,
      address,
    });

    const token = generateToken(user);

    res.status(200).json({
      status: 2000,
      success: true,
      message: 'Register successfully!',
      data: {
        id: user._id,
        token: token,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 5000, success: false, message: error.message });
  }
};

module.exports = register;
