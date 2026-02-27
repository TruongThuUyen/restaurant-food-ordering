'use client';
import { navLinks } from '@/constants/constant';
import { STORAGE_KEY } from '@/constants/storage';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { removeSessionStorage } from '@/utils/storage_actions';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';
import CartIcon from './CartIcon';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY.USER_TOKEN);
}
const Menu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { notify } = useNotify();
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const t = useTranslations('navbar');

  const handleLogout = () => {
    removeSessionStorage(STORAGE_KEY.USER_TOKEN);
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
        {navLinks?.map((item) => (
          <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
            {t(item.title)}
          </Link>
        ))}
        {!user ? (
          <Link href={RoutesName.LOGIN} onClick={() => setOpen(false)}>
            {t('login')}
          </Link>
        ) : (
          <Link href={RoutesName.ORDER} onClick={() => setOpen(false)}>
            {t('orders')}
          </Link>
        )}
        <CartIcon onClose={() => setOpen(false)} />
        {user ? (
          <button onClick={() => handleLogout()} className='uppercase cursor-pointer'>
            {t('logout')}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Menu;
