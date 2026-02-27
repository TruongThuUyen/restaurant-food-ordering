'use client';
import Image from 'next/image';

import { STORAGE_KEY } from '@/constants/storage';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { removeSessionStorage } from '@/utils/storage_actions';
import { useUser } from '@/utils/useUser';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { LanguageToggleButton } from './button/toggle/LanguageButton';
import CartIcon from './CartIcon';
import Menu from './Menu';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY.USER_TOKEN);
}

const Navbar = () => {
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const router = useRouter();
  const { notify } = useNotify();
  const { setUserProfile } = useUser();
  const t = useTranslations('navbar');
  const locale = useLocale();

  const handleLogout = () => {
    removeSessionStorage(STORAGE_KEY.USER_TOKEN);
    setUserProfile(null);
    notify('Logout sucessfully', 'success');
    setTimeout(() => {
      router.push(RoutesName.HOME);
    }, 2000);
  };

  return (
    <div className='h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
      {/* LANGUAGE TOGGLE BUTTON - DESKTOP*/}
      <div className='hidden md:flex items-center justify-center fixed top-5 left-4 bg-white px-2 py-2.5 rounded-md shadow-elevation-1'>
        <LanguageToggleButton locale={locale} />
      </div>

      {/* LANGUAGE TOGGLE BUTTON - MOBILE*/}
      <div className='md:hidden'>
        <LanguageToggleButton locale={locale} />
      </div>

      {/* LEFT LINK */}
      <div className='hidden md:flex gap-4'>
        <Link href={RoutesName.HOME}>{t('home')}</Link>
        <Link href={RoutesName.MENU}>{t('menu')}</Link>
        <Link href={RoutesName.CONTACT}>{t('contact')}</Link>
      </div>
      {/* LOGO */}
      <div className='text-xl md:font-bold flex-1 text-center'>
        <Link href={RoutesName.HOME}>Massimo</Link>
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
          <Link href={RoutesName.LOGIN}>{t('login')}</Link>
        ) : (
          <Link href={RoutesName.ORDER}>{t('orders')}</Link>
        )}
        <CartIcon />

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

export default Navbar;
