var express = require('express');
require('dotenv').config();
var router = express.Router();
const Cart = required('../models/Cart');

/* Get carts */
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId });
    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get product!' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const existingCard = await Cart.findOne({
      userId: req.body.userId,
    });

    if (existingCard)
      return res
        .status(400)
        .json({ message: 'User already has an active cart. Use the update endpoint.' });

    const card = await Cart.create(req.body);
    res.status(200).json({
      message: '',
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get product!' });
  }
});

module.exports = router;
