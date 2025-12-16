const Order = require('../models/Order');
const Product = require('../models/Products');
const { generateShortDate } = require('../utils/getDateTime');

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
  orderItem.status = status;
  await orderItem.save();
};

module.exports = {
  addOrderItem,
  updateOrderItem,
};
