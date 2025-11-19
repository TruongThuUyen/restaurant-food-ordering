'use client';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import Menu from './Menu';
import { RoutesName } from '@/routes/contanst';
import { getSessionStorage, STORAGE } from '@/utils/storage';

const Navbar = () => {
  const user = getSessionStorage(STORAGE.USER_TOKEN);

  return (
    <div className='h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
      {/* LEFT LINK */}
      <div className='hidden md:flex gap-4'>
        <Link href={RoutesName.HOME}>Home</Link>
        <Link href={RoutesName.MENU}>Menu</Link>
        <Link href={RoutesName.CONTACT}>Contact</Link>
      </div>
      {/* LOGO */}
      <div className='text-xl md:font-bold flex-1 text-center'>
        <Link href='/'>Massimo</Link>
      </div>
      {/* MOBILE MENU */}
      <div className='md:hidden'>
        <Menu />
      </div>

      {/* RIGHT LINK */}
      <div className='hidden md:flex gap-4 items-center justify-end'>
        <div className='md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-2 py-1 rounded-md'>
          <Image src='/phone.png' alt='' width={20} height={20} />
          <span>123 456 78</span>
        </div>
        {!user ? <Link href='/login'>Login</Link> : <Link href='/orders'>Orders</Link>}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
