const OrderStatus = Object.freeze(['ordered', 'preparing', 'served', 'completed', 'canceled']);

const ProductSize = Object.freeze(['Small', 'Medium', 'Large']);

const TableStatus = Object.freeze(['available', 'occupied']);

module.exports = {
  OrderStatus,
  ProductSize,
  TableStatus,
};
