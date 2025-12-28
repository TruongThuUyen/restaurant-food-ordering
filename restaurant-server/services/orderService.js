const Order = require('../models/Order');
const Product = require('../models/Products');
const { generateShortDate } = require('../utils/getDateTime');
const { OrderStatus } = require('../models/utils');

const addOrderItem = async (orderItem, table) => {
  if (!orderItem | !Array.isArray(orderItem.items)) {
    throw new Error('Invalid order data');
  }

  const orderId = generateShortDate() + '-' + orderItem.userId.slice(-4);

  // Enrich order items with corresponding product images
  const itemsWithProduct = await Promise.all(
    orderItem.items.map(async (item) => {
      const product = await Product.findById(item.productId);

      if (!product) {
        return null;
      }

      return {
        ...item,
        productImage: product.imageUrl,
      };
    })
  );

  if (itemsWithProduct.includes(null)) {
    throw new Error('Some products not found!');
  }

  // Create new order
  const newOrder = {
    ...orderItem,
    orderId,
    table,
    items: itemsWithProduct,
  };

  return await Order.create(newOrder);
};

const updateOrderItem = async (orderItem, status) => {
  if (!OrderStatus.includes(status)) throw new Error('Invalid order status!');

  const updatedOrderItem = await Order.findByIdAndUpdate(orderItem._id, { status }, { new: true });
  if (!updatedOrderItem) {
    throw new Error('Order item not found!');
  }

  return updatedOrderItem;
};

module.exports = {
  addOrderItem,
  updateOrderItem,
};
