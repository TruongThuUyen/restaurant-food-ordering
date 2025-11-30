'use client';

import { ICart, ICartRequest, ItemProduct } from '@/models/cart.model';
import { IProduct, ProductSize } from '@/models/product.model';
import { useNotify } from '@/providers/NotifyProvider';
import { getFinalPrice, subTotal, totalCost } from '@/utils/functions';
import { mergeCart } from '@/utils/mergeCarts';
import { getSessionStorage, setSessionStorage, STORAGE } from '@/utils/storage';
import { useUser } from '@/utils/useUser';
import { ShoppingCart, Square } from 'lucide-react';
import React, { useState } from 'react';
import './styled.css';
interface CartButtonProps {
  product: IProduct;
  size: ProductSize;
}

const CartButton = ({ product, size }: CartButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { notify } = useNotify();
  const { userProfile } = useUser();

  const addItemToCart = async () => {
    const userToken = getSessionStorage(STORAGE.USER_TOKEN);
    const userCart = getSessionStorage(STORAGE.USER_CART);

    if (isClicked) return;
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 3300);

    const cartItem: ItemProduct = {
      foodName: product.foodName,
      price: getFinalPrice(product, size),
      productId: product._id,
      quantity: 1,
      productImage: product.imageUrl,
      size: size,
    };

    // If user is logged in -> save new cart in db
    if (userToken) {
      // Call api merge cart to DB
      try {
        if (userProfile) {
          const newCart: ICartRequest = {
            userId: userProfile._id,
            items: [cartItem],
            deliveryCost: 0,
            serviceCost: 0,
          };

          const mergeCartResponse = await mergeCart(newCart);

          if (mergeCartResponse.status === 0)
            notify('Fail when add item to cart. Please try again!', 'error');
        } else {
          notify('Fetch user profile has error. Please try again!', 'error');
        }
      } catch (error) {
        notify('Fail when add item to cart! Please train again!', 'error');
      }
    } else {
      // If user is not logged in -> save cart in sessionStorage
      let carts: Pick<ICart, 'items' | 'deliveryCost' | 'serviceCost' | 'totalCost' | 'subTotal'> =
        {
          items: [],
          subTotal: 0,
          serviceCost: 0,
          deliveryCost: 0,
          totalCost: 0,
        };

      // Get cart from sessionStorage
      if (userCart) {
        carts = JSON.parse(userCart);
        const filteredItems = carts.items.filter((item) => item.productId === cartItem.productId);

        if (filteredItems.length > 0) {
          const index = filteredItems.findIndex((item) => item.size === size);

          // If item has same size
          if (index !== -1) {
            carts.items[index].quantity += 1;
          } else carts.items.push(cartItem);
        } else {
          carts.items.push(cartItem);
        }

        // If cart not exists in Storage
      } else {
        cartItem.quantity = 1;
        carts.items.push(cartItem);
      }

      carts.deliveryCost = 0;
      carts.serviceCost = 0;
      carts.subTotal = subTotal(carts.items);
      carts.totalCost = totalCost(carts.subTotal, carts.deliveryCost, carts.serviceCost);
      setSessionStorage(STORAGE.USER_CART, JSON.stringify(carts));
    }
  };

  return (
    <button
      onClick={() => addItemToCart()}
      className={`cart-button-custom relative h-10 w-30 group outline-none bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600
        overflow-hidden ${isClicked ? 'clicked' : ''}`}>
      {!isClicked ? (
        <span className='add-to-cart-text text-white absolute inset-0 flex items-center justify-center text-sm'>
          Add to Cart
        </span>
      ) : (
        <span className='added-text text-white absolute inset-0 flex items-center justify-center text-sm opacity-0'>
          Item Added
        </span>
      )}
      <div className='icon-container'>
        <ShoppingCart className='cart-icon-custom text-white absolute' size={25} />
        <Square className='box-icon-custom text-white fill-white absolute' size={10} />
      </div>
    </button>
  );
};

export default React.memo(CartButton);
