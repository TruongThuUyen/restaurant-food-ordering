'client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const CountDown = dynamic(() => import('./CountDown'), {
  ssr: false,
});

// Countdown time before order closes
const getNextClosingTime = () => {
  const now = new Date();
  const openTime = new Date();
  const closingTime = new Date();

  openTime.setHours(8, 0, 0, 0);
  closingTime.setHours(21, 0, 0, 0);

  if (now >= openTime && now < closingTime) {
    return {
      isOpen: true,
      nextTime: closingTime,
    };
  }

  if (now > openTime) {
    openTime.setDate(openTime.getDate() + 1);
  }

  return {
    isOpen: false,
    nextTime: openTime,
  };
};

const Offer = () => {
  const [target, setTarget] = useState(getNextClosingTime());

  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className='flex-1 flex flex-col justify-center items-center text-center gap-8 p-6'>
        <h1 className='text-white text-5xl font-bold xl:text-6xl'>Delicious Burger & French Fry</h1>
        <p className='text-white xl:text-xl'>
          Progressively simplify effective e-toilers and process-centric methods of empowerment.
          Quickly pontificate parallel.
        </p>
        <CountDown target={target} setTarget={setTarget} getNextClosingTime={getNextClosingTime} />
        {target.isOpen ? (
          <button className='bg-red-500 text-white rounded-md py-3 px-6 cursor-pointer'>
            Order Now
          </button>
        ) : (
          <button
            disabled
            className='bg-red-500 text-white rounded-md py-3 px-6
              disabled:bg-red-300
              disabled:cursor-not-allowed
              disabled:opacity-80'>
            Ordering is closed — reopens at 8:00 AM
          </button>
        )}
      </div>
      {/* IMAGE CONTAINER */}
      <div className='flex-1 w-full relative md:h-full'>
        <Image src='/offerProduct.png' alt='' fill className='object-contain' />
      </div>
    </div>
  );
};

export default Offer;
