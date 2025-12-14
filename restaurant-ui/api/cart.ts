import { CartItemRemovalRequest, ICartRequest } from '@/models/cart.model';
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

const decreaseItemQuantity = (params: CartItemRemovalRequest) => {
  return AxiosClient.post(END_POINT.CART.DECREASE, params);
};

const removeItem = (params: CartItemRemovalRequest) => {
  return AxiosClient.post(END_POINT.CART.REMOVE_ITEM, params);
};

const removeAllItem = (params: { _id: string }) => {
  return AxiosClient.post(END_POINT.CART.REMOVE_ALL_ITEM, params);
};

export { addToCart, decreaseItemQuantity, getCartByUserId, removeItem, removeAllItem };
