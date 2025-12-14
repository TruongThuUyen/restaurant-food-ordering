import { ItemProduct } from './cart.model';
import { TableStatus } from './table.model';

export const ORDER_STATUS = ['ordered', 'preparing', 'served', 'completed', 'canceled'];

export type OrderStatus = (typeof ORDER_STATUS)[number];

export type AddOrderItemParams = {
  userId: string;
  orderId: string;
  tableId: string;
  date: Date;
  totalPrice: number;
  items: ItemProduct[];
  status: OrderStatus;
};

export type UpdateStatusParam = {
  value: string | number;
  status: TableStatus;
};
