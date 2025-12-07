import { addToCart, getCartByUserId } from '@/api/cart';
import { ICartRequest } from '@/models/cart.model';

export const getCart = async (userId: string) => {
  try {
    const response = await getCartByUserId(userId);
    return {
      status: 1,
      data: response.data,
    };
  } catch (error) {
    return {
      status: 0,
      message: '',
      error: error,
    };
  }
};

export const mergeCart = async (cart: ICartRequest) => {
  try {
    const response = await addToCart(cart);
    return {
      status: 1,
      data: response.data,
    };
  } catch (error) {
    return {
      status: 0,
      data: error,
    };
  }
};
