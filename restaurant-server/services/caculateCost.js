const subTotal = (productList) => {
  if (!productList) return 0;
  const subTotal = productList.reduce((total, productItem) => {
    return total + productItem.price * productItem.quantity;
  }, 0);

  return subTotal.toFixed(2);
};

const totalCost = (cart) => {
  if (!cart) return 0;
  return (cart.subTotal + cart.serviceCost + cart.deliveryCost).toFixed(2);
};

module.exports = {
  subTotal,
  totalCost,
};
