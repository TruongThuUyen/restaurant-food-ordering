import { removeAllItem } from '@/api/cart';
import { addOrderItem } from '@/api/order';
import { ICart } from '@/models/cart.model';
import { ORDER_STATUS } from '@/models/order.model';
import { IResponse } from '@/models/response.model';

export type OrderAddOrderItemProps = {
  cart: ICart;
  tableId: string;
  userId: string;
  notify: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration?: number
  ) => void;
};

export const addOrderItemActions = async ({
  cart,
  tableId,
  userId,
  notify,
}: OrderAddOrderItemProps) => {
  const response = await addOrderItem({
    userId: userId,
    orderId: '',
    tableId: tableId,
    items: cart.items,
    totalPrice: cart.totalCost,
    date: new Date(),
    status: ORDER_STATUS[0],
  });

  if (
    response &&
    typeof response === 'object' &&
    'message' in response &&
    typeof (response as IResponse).message === 'string'
  ) {
    notify((response.message as string) ?? 'Your order has been confirmed!', 'success');
    const updateCartResponse = await removeAllItem({ _id: cart._id });
    if (updateCartResponse.status === 2000) {
      return 1;
    }
  }
  return 0;
};
