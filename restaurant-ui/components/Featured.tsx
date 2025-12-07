'use client';
import { IProduct, ProductSize } from '@/models/product.model';
import Image from 'next/image';
import { useState } from 'react';
import { CartButton } from './button/cart/CartButton';

const Featured = ({ products }: { products: IProduct[] | [] }) => {
  const [selectedSize, setSelectedSize] = useState<Record<string, ProductSize>>({});

  const FinalPrice = (product: IProduct, size: string) => {
    if (product?.options) {
      const filteredItem = product?.options.find((opt) => opt.title === size);
      if (filteredItem) {
        return (filteredItem.additionalPrice + product.price).toFixed(2);
      }
    }
    return product.price;
  };

  return (
    <div className='w-screen overflow-x-scroll text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {products?.length > 0 &&
          products?.map((item) => (
            <div
              key={item._id}
              className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-100 transitoin-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h[90vh]'>
              {/* IMAGE CONTAINER */}
              {item.imageUrl && (
                <div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
                  <Image src={item.imageUrl} alt={item.altText} fill className='object-contain' />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <div className='flex-1 flex flex-col justify-center items-center gap-4 text-center'>
                <h1 className='text-xl font-bold uppercase'>{item.foodName}</h1>
                <p className='px-4 2xl:px-8'>{item.description}</p>
                <div className='flex gap-4 items-center'>
                  {item?.options && (
                    <select
                      className='group border-1 border-red-400 text-xs py-1 px-2 outline-none'
                      value={selectedSize[item._id] ?? 'Medium'}
                      onChange={(e) =>
                        setSelectedSize((prev) => ({
                          ...prev,
                          [item._id]: e.target.value as ProductSize,
                        }))
                      }>
                      {item?.options.map((option) => (
                        <option key={option.title}>{option.title}</option>
                      ))}
                    </select>
                  )}

                  <span className='text-xl font-bold xl:text-2xl 2xl:text-3xl'>
                    {FinalPrice(item, selectedSize[item._id] ?? 'Medium')}
                  </span>
                </div>
                <CartButton product={item} size={selectedSize[item._id] ?? 'Medium'} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Featured;
