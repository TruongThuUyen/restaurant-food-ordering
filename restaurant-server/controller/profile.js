const User = require('../models/User');

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ status: 2000, success: true, data: user });
  } catch (error) {
    res.status(500).json({ status: 4000, success: false, message: 'Server error' });
  }
};

module.exports = profile;
