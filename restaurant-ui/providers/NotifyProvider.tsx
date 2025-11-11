'use client';
import { CircleCheck, CircleXIcon, TriangleAlert, TriangleAlertIcon, XIcon } from 'lucide-react';
import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';
import './notify.css';

type NotifyType = 'success' | 'error' | 'warning' | 'info';

interface Notify {
  message: string;
  type: NotifyType;
  duration?: number;
}

const typeToClass: Record<NotifyType, { bg: string; text: string; icon: ReactNode }> = {
  success: {
    bg: 'from-green-50',
    text: 'text-green-400',
    icon: <CircleCheck className='text-green-400 fill-green-100' />,
  },
  error: {
    bg: 'from-red-50',
    text: 'text-red-400',
    icon: <CircleXIcon className='text-red-400 fill-red-100' />,
  },
  warning: {
    bg: 'from-yellow-50',
    text: 'text-yellow-400',
    icon: <TriangleAlert className='text-yellow-400 fill-yellow-100' />,
  },
  info: {
    bg: 'from-blue-50',
    text: 'text-blue-400',
    icon: <TriangleAlertIcon className='text-blue-400 fill-blue-100' />,
  },
};

interface NotifyContextType {
  notify: (message: string, type: NotifyType, duration?: number) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<Notify | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    if (!ref.current) return;
    ref.current.classList.add('slide-out');
    ref.current.addEventListener(
      'animationend',
      () => {
        setNotification(null);
      },
      {
        once: true,
      }
    );
  };

  const notify = (message: string, type: NotifyType = 'info', duration: number = 3000) => {
    setNotification({ message, type, duration });
    // setTimeout(() => {
    //   setNotification(null);
    // }, duration);
  };

  return (
    <NotifyContext.Provider value={{ notify }}>
      {children}
      {!!notification && (
        <div
          ref={ref}
          className={`notify-wrapper
            fixed z-1 top-1/5 left-4 py-[10px] px-5 text-center rounded-md bg-gradient-to-r ${
              typeToClass[notification.type].bg
            } to-white shadow-[0_-2px_10px_rgba(0,0,0,0.2),0_2px_10px_rgba(0,0,0,0.2)] opacity-100
          `}>
          <div className={`flex items-start gap-4  w-full h-full`}>
            <span className='inline-block p-[6px] rounded-md shadow-[0_-2px_5px_rgba(0,0,0,0.2),0_2px_5px_rgba(0,0,0,0.2)]'>
              {typeToClass[notification.type].icon}
            </span>
            <div className='flex flex-col gap-1 text-start'>
              <p className='font-bold capitalize'>
                {notification.type === 'success'
                  ? 'Successfully'
                  : notification.type === 'error'
                  ? 'Error'
                  : notification.type === 'warning'
                  ? 'Warning'
                  : notification.type === 'info'
                  ? 'Info'
                  : ''}
              </p>
              <span className='text-sm text-[#444]'>{notification.message}</span>
            </div>
            <div className=' transition-colors duration-300'>
              <span
                className='absolute group inline-block top-2 right-2 p-1 hover:bg-[#bfbfbf] cursor-pointer rounded-full'
                onClick={() => handleClose()}>
                <XIcon className='group-hover:text-white size-4.5 top-[10px] right-[10px]' />
              </span>
            </div>
          </div>
        </div>
      )}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) throw new Error('useNotify must be used within NotifyProvider');
  return context;
};
