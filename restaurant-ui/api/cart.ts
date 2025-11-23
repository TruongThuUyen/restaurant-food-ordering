import { ICartRequest } from '@/models/cart.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getCartByUserId = (userId: string) => {
  return AxiosClient.post(END_POINT.CART.GET_BY_USER_ID, {
    userId: userId,
  });
};

const addToCart = (cartItem: ICartRequest) => {
  return AxiosClient.post(END_POINT.CART.ADD_TO_CART, cartItem);
};

export { addToCart, getCartByUserId };
