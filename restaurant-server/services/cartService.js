const Cart = require('../models/Cart');
const Product = require('../models/Products');

const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};

// Create new Cart
const createCart = async (userId, itemsFromClient, serviceCost = 0, deliveryCost = 0) => {
  const cartNumber = `CART-${Date.now()}-${userId}`;
  const transformedItems = [];

  for (const clientItem of itemsFromClient) {
    const product = await Product.findById(clientItem.productId);
    const finalPrice = computeFinalPrice(product, clientItem.size);

    transformedItems.push({
      productId: product._id,
      foodName: product.foodName,
      quantity: clientItem.quantity,
      size: clientItem.size,
      productImage: product.image,
      price: finalPrice,
    });
  }

  const cart = await Cart.create({
    userId,
    cartNumber,
    items: transformedItems,
    subTotal: subTotalCost(transformedItems),
    serviceCost,
    deliveryCost,
    totalCost: Number((subTotalCost(transformedItems) + serviceCost + deliveryCost).toFixed(2)),
  });

  return cart;
};

const mergeCart = async (cart, itemsFromClient) => {
  // Merge if cart exists
  for (const clientItem of itemsFromClient) {
    const product = await Product.findById(clientItem.productId);
    const finalPrice = computeFinalPrice(product, clientItem.size);

    // If item exists in items?
    const existingList = cart.items.filter((i) => i.productId.toString() === clientItem.productId);

    if (existingList.length > 0) {
      // Finding item has same size
      const sameSizeItem = existingList.find((i) => i.size === clientItem.size);

      // Inscrease quantity if item has same size
      if (sameSizeItem) {
        sameSizeItem.quantity += clientItem.quantity;
        sameSizeItem.price = finalPrice;
      } else {
        cart.items.push({
          productId: product._id,
          foodName: product.foodName,
          quantity: clientItem.quantity,
          size: clientItem.size,
          productImage: product.productImage,
          price: finalPrice,
        });
      }
    } else {
      // Add new item for cart/items
      cart.items.push({
        productId: product._id,
        foodName: product.foodName,
        quantity: clientItem.quantity,
        size: clientItem.size,
        productImage: product.productImage,
        price: finalPrice,
      });
    }
  }

  cart.subTotal = subTotalCost(cart.items);
  cart.totalCost = totalCost(cart);
  await cart.save();

  return cart;
};

const subTotalCost = (productList) => {
  if (!productList) return 0;
  const subTotal = productList.reduce((total, productItem) => {
    return total + productItem.price * productItem.quantity;
  }, 0);

  return Number(subTotal.toFixed(2));
};

const totalCost = (cart) => {
  if (!cart) return 0;
  return (cart.subTotal + cart.serviceCost + cart.deliveryCost).toFixed(2);
};

const computeFinalPrice = (product, size) => {
  const opt = product.options?.find((o) => o.title === size);
  const additionalPrice = opt?.additionalPrice ?? 0;
  return product.price + additionalPrice;
};

module.exports = {
  getCart,
  createCart,
  mergeCart,
};
