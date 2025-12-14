const Order = require('../models/Order');

const addOrderItem = async (orderItem) => {
  const orderId = `ORD-${Date.now()}-${orderItem.userId}`;
  orderItem.orderId = orderId;
  await Order.insertOne(orderItem);
};

const updateOrderItem = async (orderItem, status) => {
  orderItem.status = status;
  await orderItem.save();
};

module.exports = {
  addOrderItem,
  updateOrderItem,
};
