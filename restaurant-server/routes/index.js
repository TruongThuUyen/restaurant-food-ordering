var express = require('express');
require('dotenv').config();
var router = express.Router();
const Product = require('../models/Products');

/* GET products */
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when get comments' });
  }
});
module.exports = router;
