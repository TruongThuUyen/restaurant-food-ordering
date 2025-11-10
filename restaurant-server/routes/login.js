var express = require('express');
require('dotenv').config();
var router = express.Router();
const User = require('../models/User');

/* Check user logining */
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); //get all
    res.json(users.length); // return a JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when get comments' });
  }
});
module.exports = router;
