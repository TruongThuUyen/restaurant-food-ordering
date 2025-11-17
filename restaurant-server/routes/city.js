var express = require('express');
const City = require('../models/City');
var router = express.Router();

/* GET all city */
router.get('/', async (req, res) => {
  try {
    /* If have query param */
    const { city } = req.query;
    const query = city ? { value: city } : {};
    const countries = await City.find(query);
    res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get products!' });
  }
});

module.exports = router;
