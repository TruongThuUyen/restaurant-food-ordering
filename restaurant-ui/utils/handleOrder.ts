import { removeAllItem } from '@/api/cart';
import { addOrderItem } from '@/api/order';
import { ICart, ItemProduct } from '@/models/cart.model';
import { IOrder, ORDER_STATUS } from '@/models/order.model';
import { ITable, TABLE_STATUS, TableStatus } from '@/models/table.model';

function isItemProduct(item: unknown): item is ItemProduct {
  return (
    typeof item === 'object' &&
    item !== null &&
    'productId' in item &&
    'foodName' in item &&
    'quantity' in item &&
    'price' in item &&
    'size' in item &&
    typeof item.productId === 'string' &&
    typeof item.foodName === 'string' &&
    typeof item.quantity === 'number' &&
    typeof item.price === 'number' &&
    ['Small', 'Medium', 'Large'].includes(item.size as string)
  );
}

function isItemProductList(obj: unknown): obj is ItemProduct[] {
  return Array.isArray(obj) && obj.every(isItemProduct);
}

function isTable(obj: unknown): obj is ITable {
  return (
    typeof obj === 'object' &&
    !!obj &&
    '_id' in obj &&
    'value' in obj &&
    'label' in obj &&
    'status' in obj &&
    typeof obj._id === 'string' &&
    (typeof obj.value === 'string' || typeof obj.value === 'number') &&
    typeof obj.label === 'string' &&
    typeof obj.status === 'string' &&
    TABLE_STATUS.includes(obj.status as TableStatus)
  );
}

export const isOrdersList = (obj: unknown): obj is IOrder[] => {
  return (
    Array.isArray(obj) &&
    obj.every(
      (item) =>
        item &&
        typeof item.userId === 'string' &&
        typeof item.orderId === 'string' &&
        typeof item.date === 'string' &&
        typeof item.totalPrice === 'number' &&
        ORDER_STATUS.includes(item.status) &&
        isTable(item.table) &&
        isItemProductList(item.items)
    )
  );
};

export type OrderAddOrderItemProps = {
  cart: ICart;
  table: Omit<ITable, '_id'>;
  userId: string;
  notify: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration?: number
  ) => void;
};

export const addOrderItemActions = async ({
  cart,
  table,
  userId,
  notify,
}: OrderAddOrderItemProps) => {
  const response = await addOrderItem({
    userId: userId,
    orderId: '',
    table: table,
    items: cart.items,
    totalPrice: cart.totalCost,
    date: new Date(),
    status: ORDER_STATUS[0],
  });

  if (response.status !== 2000) {
    return 0;
  }

  notify('Your order has been confirmed!', 'success');
  const updateCartResponse = await removeAllItem({ _id: cart._id });

  if (updateCartResponse.status !== 2000) {
    return 0;
  }
  return 1;
};
