var express = require('express');
require('dotenv').config();
var router = express.Router();
const Product = require('../models/Products');

/* GET products */
router.get('/', async (req, res) => {
  try {
    /* If have query param */
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get products!' });
  }
});

/* GET products by ID */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get product!' });
  }
});

module.exports = router;
