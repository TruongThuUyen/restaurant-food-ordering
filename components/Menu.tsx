'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';

const links = [
  {
    id: 1,
    title: 'HomePage',
    url: '/',
  },
  {
    id: 2,
    title: 'Menu',
    url: '/menu',
  },
  {
    id: 3,
    title: 'Working Hourse',
    url: '/',
  },
  {
    id: 4,
    title: 'Contact',
    url: '/',
  },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const user = false;

  return (
    <div>
      {!open ? (
        <Image
          src='/open.png'
          alt=''
          width={20}
          height={20}
          onClick={() => setOpen(true)}
          className='cursor-pointer'
        />
      ) : (
        <Image
          src='/close.png'
          alt=''
          width={20}
          height={20}
          onClick={() => setOpen(false)}
          className='cursor-pointer'
        />
      )}
      {open && (
        <div className='absolute z-10 left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 justify-center items-center text-xl bg-red-500 text-white uppercase '>
          {links?.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {!user ? (
            <Link href='/login' onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href='/orders' onClick={() => setOpen(false)}>
              Orders
            </Link>
          )}

          <Link href='/card' onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
