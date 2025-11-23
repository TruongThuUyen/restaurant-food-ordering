var express = require('express');
require('dotenv').config();
var router = express.Router();
const Order = require('../models/Order');

/* GET list of orders */
router.get('/', async (req, res) => {
  try {
    const listOfOrders = await Order.find();
    res.status(200).json({
      success: true,
      data: listOfOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get product!' });
  }
});

module.exports = router;
