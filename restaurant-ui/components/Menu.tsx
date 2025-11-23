'use client';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { removeSessionStorage, STORAGE } from '@/utils/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';
import CartIcon from './CartIcon';

const links = [
  {
    id: 1,
    title: 'HomePage',
    url: RoutesName.HOME,
  },
  {
    id: 2,
    title: 'Menu',
    url: RoutesName.MENU,
  },
  {
    id: 3,
    title: 'Working Hourse',
    url: RoutesName.HOME,
  },
  {
    id: 4,
    title: 'Contact',
    url: RoutesName.CONTACT,
  },
];

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE.USER_TOKEN);
}
const Menu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { notify } = useNotify();
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const handleLogout = () => {
    removeSessionStorage(STORAGE.USER_TOKEN);
    notify('Logout sucessfully', 'success');
    setOpen(false);
    setTimeout(() => {
      router.push(RoutesName.HOME);
    }, 2000);
  };

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
      <div
        className={`absolute z-10 left-0 top-12 w-full flex flex-col gap-8 justify-center items-center text-xl bg-red-500 text-white uppercase
         transition-all duration-500 ease-in-out overflow-hidden
          ${open ? 'h-[calc(100vh-6rem)] opacity-100' : 'h-0 opacity-0'}
        `}>
        {links?.map((item) => (
          <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
            {item.title}
          </Link>
        ))}
        {!user ? (
          <Link href={RoutesName.LOGIN} onClick={() => setOpen(false)}>
            Login
          </Link>
        ) : (
          <Link href={RoutesName.ORDER} onClick={() => setOpen(false)}>
            Orders
          </Link>
        )}
        <CartIcon onClose={() => setOpen(false)} />
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

export default Menu;
