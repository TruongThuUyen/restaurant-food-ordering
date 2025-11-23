import { ItemProduct } from '@/models/cart.model';

const subTotal = (productList: ItemProduct[]) => {
  const subtotal = productList.reduce((total: number, productItem: ItemProduct) => {
    return total + productItem.price * productItem.quantity;
  }, 0);

  return Number(subtotal.toFixed(2));
};

const totalCost = (subTotal: number, deliveryCost: number, serviceCost: number) => {
  return Number((subTotal + deliveryCost + serviceCost).toFixed(2));
};

export { subTotal, totalCost };
