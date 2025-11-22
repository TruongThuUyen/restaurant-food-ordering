import { ICart } from '@/models/cart.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getCartByUserId = (userId: string) => {
  return AxiosClient.post(END_POINT.CART.GET_BY_USER_ID, userId);
};

const addToCart = (cartItem: Omit<ICart, '_id' | 'cartNumber'>) => {
  return AxiosClient.post(END_POINT.CART.ADD_TO_CART, cartItem);
};

export { getCartByUserId, addToCart };
