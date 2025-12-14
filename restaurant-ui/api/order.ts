import { AddOrderItemParams } from '@/models/order.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const addOrderItem = async (params: AddOrderItemParams) => {
  return AxiosClient.post(END_POINT.ORDER.ADD_ORDER_ITEM, params);
};

export { addOrderItem };
