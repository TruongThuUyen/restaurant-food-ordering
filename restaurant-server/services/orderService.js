const Order = require('../models/Order');
const { generateShortDate } = require('../utils/getDateTime');

const addOrderItem = async (orderItem) => {
  const shortId = generateShortDate + '-' + orderItem.userId.slice(-4);
  const orderId = shortId;
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
