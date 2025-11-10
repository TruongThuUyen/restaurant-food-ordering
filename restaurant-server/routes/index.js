var express = require('express');
require('dotenv').config();
var router = express.Router();
const ImageTemporary = require('../models/Images');

/* GET images temporary */
router.get('/', async (req, res) => {
  try {
    const images = await ImageTemporary.find(); //get all images
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when get comments' });
  }
});
module.exports = router;
