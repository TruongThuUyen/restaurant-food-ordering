const Order = require('../models/Order');
const Table = require('../models/Table');
const User = require('../models/User');
const orderService = require('../services/orderService');
const { OrderStatus } = require('../models/utils');

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
      .json({ success: false, message: 'Sorry! Could not retrieve your order.' });
  }
};

const insertOrderItem = async (req, res) => {
  try {
    if (req.body.items.length === 0)
      return res.status(400).json({
        status: 4000,
        success: false,
        message: 'The order must contain at least one item.',
      });

    const table = await Table.findById(req.body.tableId);
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ status: 4040, success: false, message: 'User not found!' });
    }

    if (!table) {
      return res.status(404).json({ status: 4040, success: false, message: 'Table not found!' });
    } else if (table.status === 'occupied')
      return res.status(400).json({
        status: 4000,
        success: false,
        message: 'The selected table is currently occupied.',
      });

    const orderItem = await orderService.addOrderItem(req.body, table._id);
    return res
      .status(200)
      .json({ status: 2000, data: orderItem, message: 'Your order has been confirmed!' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Sorry! Something went wrong while creating the order.' });
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

    const response = await orderService.updateOrderItem(orderItem, req.body.status);
    return res.status(200).json({ status: 2000, success: true, data: response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Sorry! Something went wrong while updating status.' });
  }
};

module.exports = { getOrdersListByUserID, insertOrderItem, updateOrderStatus };
