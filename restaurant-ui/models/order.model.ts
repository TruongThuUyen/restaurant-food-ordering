import { ItemProduct } from './cart.model';
import { ITable, TableStatus } from './table.model';

export const ORDER_STATUS = ['ordered', 'preparing', 'served', 'completed', 'canceled'];

export type OrderStatus = (typeof ORDER_STATUS)[number];

export interface IOrder {
  _id: string;
  userId: string;
  orderId: string;
  table: Omit<ITable, '_id'>;
  date: Date;
  totalPrice: number;
  items: ItemProduct[];
  status: OrderStatus;
}

export type UpdateStatusParam = {
  value: string | number;
  status: TableStatus;
};

type OrderStatusMapType = Record<
  OrderStatus,
  {
    value: string;
    background: string;
    color: string;
  }
>;

export const ORDER_STATUS_MAP: OrderStatusMapType = {
  ordered: { value: 'ordered', background: 'bg-amber-200', color: 'text-amber-800' },
  preparing: { value: 'preparing', background: 'bg-cyan-100', color: 'text-cyan-800' },
  served: { value: 'served', background: 'bg-lime-200', color: 'text-lime-700' },
  completed: { value: 'completed', background: 'bg-green-300', color: 'text-lime-700' },
  canceled: { value: 'canceled', background: 'bg-red-100', color: 'text-red-600' },
};
