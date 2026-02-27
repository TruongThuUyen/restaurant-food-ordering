'use client';

import { STORAGE_KEY } from '@/constants/storage';
import { setCookie } from '@/utils/functions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LanguageToggleButton = ({ locale }: { locale?: string }) => {
  const router = useRouter();
  const [toggled, setToggled] = useState(locale === 'vi');

  const changeLangue = () => {
    setCookie(STORAGE_KEY.LANGUAGE_COOKIE_NAME, !toggled ? 'vi' : 'en', 1);
    setToggled(!toggled);
    router.refresh();
  };

  useEffect(() => {
    setToggled(locale === 'vi');
  }, [locale]);

  return (
    <div className='flex items-center gap-2 justify-end'>
      <p className='font-semibold text-red-700 text-sm'>{toggled ? 'VN' : 'EN'}</p>
      <button
        onClick={() => changeLangue()}
        className={`flex items-center px-1 w-10 h-5 rounded-4xl ${!toggled ? 'bg-gray-400' : 'bg-blue-500'} cursor-pointer transition-colors duration-200`}>
        <div
          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 ${toggled ? 'translate-x-4.5' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};
