'use client';

import { IProduct, ProductSize } from '@/models/product.model';
import { useNotify } from '@/providers/NotifyProvider';
import { addItemToCartAction } from '@/utils/handleCart';
import { useUser } from '@/utils/useUser';
import { ShoppingCart, Square } from 'lucide-react';
import React, { useState } from 'react';
import './styled.css';
interface CartButtonProps {
  product: IProduct;
  size: ProductSize;
}

const CartButtonComponent = ({ product, size }: CartButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { notify } = useNotify();
  const { userProfile } = useUser();

  const addItemToCart = async () => {
    if (isClicked) return;
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);

    await addItemToCartAction({ product, size, userProfile, notify });
  };

  return (
    <button
      onClick={() => addItemToCart()}
      className={`cart-button-custom relative h-9 w-30 group outline-none bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600
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

export const CartButton = React.memo(CartButtonComponent);
