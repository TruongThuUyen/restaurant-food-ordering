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
      productImage: product.imageUrl,
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
          productImage: product.imageUrl,
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
        productImage: product.imageUrl,
        price: finalPrice,
      });
    }
  }

  cart.subTotal = subTotalCost(cart.items);
  cart.totalCost = totalCost(cart);
  await cart.save();

  return cart;
};

const decreaseItemQuantity = async (productId, productSize, cart) => {
  const index = cart.items.findIndex(
    (item) => item.productId.toString() === productId && item.size === productSize
  );
  if (index === -1) return 0;

  if (cart.items[index].quantity > 1) {
    cart.items[index].quantity -= 1;
  } else {
    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== cart.items[index].productId.toString() ||
        item.size !== productSize
    );
  }
  cart.subTotal = subTotalCost(cart.items);
  cart.totalCost = totalCost(cart);

  await cart.save();

  return 1;
};

const removeItem = async (cart, productId, productSize) => {
  const index = cart.items.findIndex(
    (item) => item.productId.toString() === productId && item.size === productSize
  );

  if (index === -1) return 0;

  cart.items = cart.items.filter(
    (item) =>
      item.productId.toString() !== cart.items[index].productId.toString() ||
      item.size !== productSize
  );
  cart.subTotal = subTotalCost(cart.items);
  cart.totalCost = totalCost(cart);

  await cart.save();
  return 1;
};

const removeAllItemInCart = async (cart) => {
  cart.items = [];
  cart.subTotal = 0;
  cart.totalCost = 0;
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
  return Number((cart.subTotal + cart.serviceCost + cart.deliveryCost).toFixed(2));
};

const computeFinalPrice = (product, size) => {
  const opt = product.options?.find((o) => o.title === size);
  const additionalPrice = opt?.additionalPrice ?? 0;
  return Number((product.price + additionalPrice).toFixed(2));
};

module.exports = {
  getCart,
  createCart,
  mergeCart,
  decreaseItemQuantity,
  removeItem,
  removeAllItemInCart,
};
