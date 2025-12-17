import { IOrder } from '@/models/order.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getOrdersListByUserId = async (id: string) => {
  return AxiosClient.get(END_POINT.ORDER.GET_ORDERS_LIST_BY_USERID(id));
};

const addOrderItem = async (params: Omit<IOrder, '_id'>) => {
  return AxiosClient.post(END_POINT.ORDER.ADD_ORDER_ITEM, params);
};

export { addOrderItem, getOrdersListByUserId };
