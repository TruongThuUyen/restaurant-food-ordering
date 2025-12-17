const Cart = require('../models/Cart');
const cartService = require('../services/cartService');

const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cart = await cartService.getCart(userId);
    if (!cart) return res.status(200).json({ status: 4000, message: 'No item in cart!' });

    return res.status(200).json({ status: 2000, data: cart });
  } catch (error) {
    res.status(500).json({ message: 'Error when get cart!' });
  }
};

const mergeCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemsFromClient = req.body.items;

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
      cart = await cartService.createCart(userId, itemsFromClient);
      return res
        .status(200)
        .json({ status: 20000, success: true, message: 'Cart created successfully', data: cart });
    }

    // Merge if cart exists
    cart = await cartService.mergeCart(cart, itemsFromClient);
    return res
      .status(200)
      .json({ status: 20001, success: true, message: 'Cart merged successfully', data: cart });
  } catch (error) {
    return res.status(500).json({ message: 'Error when add to cart!' });
  }
};

const decreaseItemQuantity = async (req, res) => {
  const id = req.body._id;
  try {
    let cart = await Cart.findById(id);
    if (!cart)
      return res.status(400).json({ status: 4000, success: true, message: 'Cart not found!' });
    else {
      const response = await cartService.decreaseItemQuantity(
        req.body.productId,
        req.body.productSize,
        cart
      );

      if (response === 1) {
        res.status(200).json({
          status: 2000,
          success: true,
          message: 'Remove item from cart successfully!',
          data: cart,
        });
      } else {
        return res
          .status(400)
          .json({ status: 4000, success: true, message: 'Cannot remove item from cart!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error when remove item from cart!' });
  }
};

const removeItem = async (req, res) => {
  try {
    const cartId = req.body._id;
    const cart = await Cart.findById(cartId);
    if (!cart)
      return res.status(400).json({ status: 4000, success: true, message: 'Cart not found!' });

    const response = await cartService.removeItem(cart, req.body.productId, req.body.productSize);
    if (response === 1) {
      res.status(200).json({
        status: 2000,
        success: true,
        message: 'Remove item from cart successfully!',
        data: cart,
      });
    } else {
      return res
        .status(400)
        .json({ status: 4000, success: true, message: 'Cannot remove item from cart!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error when remove item from cart!' });
  }
};

const removeAllItemInCart = async (req, res) => {
  try {
    const cartId = req.body._id;
    const cart = await Cart.findById(cartId);
    if (!cart)
      return res.status(400).json({ status: 4000, success: true, message: 'Cart not found!' });
    else {
      const response = await cartService.removeAllItemInCart(cart);
      if (response) {
        res.status(200).json({
          status: 2000,
          success: true,
          data: response,
        });
      }
    }
  } catch (error) {
    return res.status(500);
  }
};

module.exports = { getCart, mergeCart, decreaseItemQuantity, removeItem, removeAllItemInCart };
