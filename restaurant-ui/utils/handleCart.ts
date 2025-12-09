import { ICart, ICartRequest, ItemProduct } from '@/models/cart.model';
import { IProduct, ProductSize } from '@/models/product.model';
import { IUser } from '@/models/user.model';
import { getSessionStorage, setSessionStorage, STORAGE } from './storage';
import { mergeCart } from './mergeCarts';
import { getErrorMessage } from './errorHandle';
import { getFinalPrice, subTotal, totalCost } from './functions';

export type CartAddItemParams = {
  product: IProduct;
  size: ProductSize;
  quantity?: number;
  userProfile: IUser | null;
  notify: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration?: number
  ) => void;
};

export const addItemToCartAction = async ({
  product,
  size,
  quantity = 1,
  userProfile,
  notify,
}: CartAddItemParams) => {
  const userToken = getSessionStorage(STORAGE.USER_TOKEN);
  const userCart = getSessionStorage(STORAGE.USER_CART);

  const cartItem: ItemProduct = {
    foodName: product.foodName,
    price: Number(getFinalPrice(product, size)),
    productId: product._id,
    quantity: quantity ?? 1,
    productImage: product.imageUrl,
    size: size,
  };

  if (userToken) {
    if (!userProfile) {
      notify('Fetch user profile has error. Please try again!', 'error');
      return;
    }
    const newCart: ICartRequest = {
      userId: userProfile._id,
      items: [cartItem],
      deliveryCost: 0,
      serviceCost: 0,
    };
    try {
      const mergeCartResponse = await mergeCart(newCart);

      if (mergeCartResponse.status === 0)
        notify('Fail when add item to cart. Please try again!', 'error');
    } catch (error) {
      getErrorMessage(error);
    }
  } else {
    // If user is not logged in -> save cart in sessionStorage
    let carts: Pick<ICart, 'items' | 'deliveryCost' | 'serviceCost' | 'totalCost' | 'subTotal'> = {
      items: [],
      subTotal: 0,
      serviceCost: 0,
      deliveryCost: 0,
      totalCost: 0,
    };

    // Get cart from sessionStorage
    if (userCart) {
      carts = JSON.parse(userCart);
      const index = carts.items.findIndex(
        (item) => item.productId === cartItem.productId && item.size === size
      );

      if (index !== -1) {
        carts.items[index].quantity += quantity;
      } else {
        carts.items.push(cartItem);
      }

      // If cart not exists in Storage
    } else {
      cartItem.quantity = quantity;
      carts.items.push(cartItem);
    }

    carts.deliveryCost = 0;
    carts.serviceCost = 0;
    carts.subTotal = subTotal(carts.items);
    carts.totalCost = totalCost(carts.subTotal, carts.deliveryCost, carts.serviceCost);
    setSessionStorage(STORAGE.USER_CART, JSON.stringify(carts));
  }

  return 1;
};
