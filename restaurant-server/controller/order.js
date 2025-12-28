const Order = require('../models/Order');
const Table = require('../models/Table');
const User = require('../models/User');
const orderService = require('../services/orderService');
const { OrderStatus } = require('../models/utils');
const mongoose = require('mongoose');

const getOrdersListByUserID = async (req, res) => {
  try {
    const ordersList = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
    if (!ordersList)
      return res
        .status(404)
        .json({ status: 4040, success: false, message: 'Sorry! Could not retrieve your order.' });

    return res.status(200).json({ status: 2000, success: true, message: '', data: ordersList });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 5000, success: false, message: 'Sorry! Could not retrieve your order.' });
  }
};

const insertOrderItem = async (req, res) => {
  // Initial session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate items in order from client
    if (req.body.items.length === 0)
      return res.status(400).json({
        status: 4000,
        success: false,
        message: 'The order must contain at least one item.',
      });

    // Validate table existence
    const table = await Table.findById(req.body.table._id);
    // Validate user existence
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ status: 4040, success: false, message: 'User not found!' });
    }

    if (!table) {
      return res.status(404).json({ status: 4040, success: false, message: 'Table not found!' });
    } else if (table.status === 'occupied') {
      return res.status(400).json({
        status: 4000,
        success: false,
        message: 'The selected table is currently occupied.',
      });
    }

    table.status = 'occupied';

    // Create new order
    const orderItem = await orderService.addOrderItem(req.body, table);

    // Update table status
    await table.save({ session });

    // Commit all
    await session.commitTransaction();

    return res
      .status(200)
      .json({ status: 2000, data: orderItem, message: 'Your order has been confirmed!' });
  } catch (error) {
    // Rollback if has error
    await session.abortTransaction();
    return res.status(500).json({
      status: 5000,
      success: false,
      message: error.message ?? 'Sorry! Something went wrong while creating the order.',
    });
  } finally {
    session.endSession();
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;

    if (!OrderStatus.includes(status))
      return res
        .status(400)
        .json({ status: 4000, success: false, message: 'Invalid order status provided!' });

    const orderItem = Order.find(orderId);
    if (!orderItem)
      return res.status(404).json({ status: 4040, success: false, message: 'Order not found!' });

    const updatedOrderItem = await orderService.updateOrderItem(orderItem, req.body.status);
    return res.status(200).json({ status: 2000, success: true, data: updatedOrderItem });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: 5000,
        success: false,
        message: 'Sorry! Something went wrong while updating status.',
      });
  }
};

module.exports = { getOrdersListByUserID, insertOrderItem, updateOrderStatus };
