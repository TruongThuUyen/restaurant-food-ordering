import { featuredProducts } from '@/data/data';
import Image from 'next/image';
import React from 'react';

const Featured = () => {
  return (
    <div className='w-screen overflow-x-scroll text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {featuredProducts?.map((item) => (
          <div
            key={item.id}
            className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-100 transitoin-all duration-300'>
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className='relative flex-1 w-full'>
                <Image
                  src={item.img}
                  alt=''
                  fill
                  className='object-contain hover:rotate-[60deg] transition-all duration-300'
                />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className='flex-1 flex flex-col items-center gap-4 text-center'>
              <h1 className='text-xl font-bold uppercase'>{item.title}</h1>
              <p className='px-4'>{item.desc}</p>
              <span className='text-xl font-bold'>{item.price}</span>
              <button className='bg-red-500 text-white p-2 rounded-md'>Add to Card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
// 56:25
