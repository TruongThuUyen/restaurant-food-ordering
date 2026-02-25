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

const setCookie = (name: string, value: string, days: number) => {
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure' : ''}`;
};

const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
};

const clearCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure' : ''}`;
};

export { subTotal, totalCost, getFinalPrice, formatDate, setCookie, getCookie, clearCookie };
