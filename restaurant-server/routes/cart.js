var express = require('express');
const Cart = require('../models/Cart');
const { getDateTime } = require('../utils/getDateTime');
var router = express.Router();

/* Get carts */
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    const carts = await Cart.findOne({ userId });
    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when get cart!' });
  }
});

router.post('/merge', async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemsFromClient = req.body.items;
    console.log(req.body);

    // Validate
    if (!itemsFromClient || itemsFromClient.length === 0) {
      return res.status(400).json({
        message: 'Items empty',
        success: false,
      });
    }

    let cart = await Cart.findOne({ userId });

    // If cart not exist -> create new cart
    if (!cart) {
      const cartNumber = `CART-${getDateTime()}-${userId}`;
      cart = await Cart.create({
        userId,
        items: itemsFromClient,
        cartNumber: cartNumber,
        serviceCost: req.body.serviceCost,
        deliveryCost: req.body.deliveryCost,
        totalCost: req.body.totalCost,
      });

      return res.status(200).json({
        message: 'Cart created successfully',
        success: true,
        data: cart,
      });
    }

    // Merge if cart exists
    itemsFromClient.forEach((clientItem) => {
      const existingItem = cart.items.find((i) => i.productId.toString() === clientItem.productId);

      if (existingItem) {
        existingItem.quantity += clientItem.quantity;
      } else {
        cart.items.push(clientItem);
      }
    });

    await cart.save();

    return res.json({
      message: 'Cart merged successfully',
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when add to cart!' });
  }
});

module.exports = router;
