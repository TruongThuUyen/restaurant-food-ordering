'use client';

import { addItemToCartAction, CartAddItemParams } from '@/utils/handleCart';
import { CheckIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = Omit<CartAddItemParams, 'size'>;

const PriceByProductAndSize = ({ product, userProfile, notify }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const total = useMemo(() => {
    if (product.options && product.options[selected])
      return quantity * (product.price + product.options[selected].additionalPrice);
    else {
      return quantity * product.price;
    }
  }, [quantity, selected, product.options, product.price]);

  const addProduct = async () => {
    if (isAdded) return;
    if (product.options) {
      const size = product.options[selected].title ?? 'Medium';
      const response = await addItemToCartAction({ product, size, userProfile, notify });
      if (response) {
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 1000);
      }
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>{total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className='flex gap-4'>
        {product.options?.map((option, index) => (
          <button
            key={option.title}
            className='min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md cursor-pointer'
            style={{
              background: selected === index ? 'rgb(248 113 113)' : 'white',
              color: selected === index ? 'white' : 'red',
            }}
            onClick={() => setSelected(index)}>
            {option.title}
          </button>
        ))}
      </div>

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className='flex justify-between items-center'>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-3 ring-1 ring-red-500'>
          <span>Quantity</span>
          <div className='flex gap-4 item-center'>
            <button
              className={`${quantity === 1 ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>{`<`}</button>
            <span>{quantity}</span>
            <button
              className={`${quantity >= 9 ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
              onClick={() => setQuantity((prev) => (prev === 9 ? 9 : prev + 1))}>{`>`}</button>
          </div>
        </div>

        {!isAdded ? (
          <button
            className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 cursor-pointer'
            onClick={() => addProduct()}>
            Add to Card
          </button>
        ) : (
          <div className='capitalize w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 cursor-pointer flex gap-2 items-center justify-center'>
            <CheckIcon size={21} />
            added
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceByProductAndSize;
