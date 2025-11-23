'use client';
import Image from 'next/image';

import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { removeSessionStorage, STORAGE } from '@/utils/storage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import CartIcon from './CartIcon';
import Menu from './Menu';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE.USER_TOKEN);
}

const Navbar = () => {
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const router = useRouter();
  const { notify } = useNotify();

  const handleLogout = () => {
    removeSessionStorage(STORAGE.USER_TOKEN);
    notify('Logout sucessfully', 'success');
    setTimeout(() => {
      router.push(RoutesName.HOME);
    }, 2000);
  };

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
        {!user ? (
          <Link href={RoutesName.LOGIN}>Login</Link>
        ) : (
          <Link href={RoutesName.ORDER}>Orders</Link>
        )}
        <CartIcon />

        {user ? (
          <button onClick={() => handleLogout()} className='uppercase cursor-pointer'>
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Navbar;
