import { ItemProduct } from '@/models/cart.model';
import { IProduct } from '@/models/product.model';

const subTotal = (productList: ItemProduct[]) => {
  const subtotal = productList.reduce((total: number, productItem: ItemProduct) => {
    return total + productItem.price * productItem.quantity;
  }, 0);

  return Number(subtotal.toFixed(2));
};

const totalCost = (subTotal: number, deliveryCost: number, serviceCost: number) => {
  return Number((subTotal + deliveryCost + serviceCost).toFixed(2));
};

const getFinalPrice = (product: IProduct, size: string) => {
  const options = product.options?.find((opt) => opt.title === size);
  const additional = options?.additionalPrice ?? 0;
  return (product.price + additional).toFixed(2);
};

const formatDate = (isoDate: Date) => {
  const dateObject = new Date(isoDate);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const padZero = (num: number) => String(num).padStart(2, '0');
  const formatDateTime = `${year}-${padZero(month)}-${padZero(day)}`;
  return formatDateTime;
};

export { subTotal, totalCost, getFinalPrice, formatDate };
