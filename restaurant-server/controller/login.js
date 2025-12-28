const generateToken = require('../utils/jwt');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ status: 3000, success: false, message: 'User not found!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: 4000, success: false, message: 'Wrong password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: 2000,
      success: true,
      message: 'Login successfully!',
      data: {
        token: token,
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 5000, success: false, message: error.message });
  }
};

module.exports = login;
