'use client';
import { FiledInput } from '@/components/field/input/FieldInput';
import scheme from '@/app/(auth)/login/scheme';
import { EyeClosed, EyeIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import './styled.css';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldError from '@/components/field/error/FieldError';
import { RoutesName } from '@/routes/contanst';

type ModalProps = {
  onClose: (value: boolean) => void;
};

interface FormValues {
  email?: string;
  password?: string;
}

const LoginModal = ({ onClose }: ModalProps) => {
  const [showPass, setShowPass] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(scheme),
  });

  const closeTheModal = () => {
    if (!ref.current) return;
    ref.current.classList.add('push-popup-up');
    ref.current.addEventListener(
      'animationend',
      () => {
        onClose(false);
      },
      {
        once: true,
      }
    );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(form.getValues());
    console.log('data:: ', data);
  };

  return (
    <div
      ref={ref}
      className='fixed inset-0 z-100 bg-black/40 flex items-center justify-center pull-popup-down'>
      <div className='w-[80%] sm:w-100 bg-white p-5 rounded-xl relative'>
        <p className='capitalize text-black text-xl sm:text-2xl font-medium'>
          Let's get <span className='text-(--color-navy)'>started</span>
        </p>
        {/* FORM CONTAINER */}
        <FormProvider {...form}>
          <div className='flex flex-col gap-5 my-6'>
            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Email address</p>
              <FiledInput
                name='email'
                placeholder='Enter your email'
                type='text'
                required
                className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-red)'
              />
              <FieldError name='email' />
            </div>
            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Password</p>
              <div className='w-full relative'>
                <FiledInput
                  name='password'
                  placeholder='Enter your password'
                  type={showPass ? 'text' : 'password'}
                  required
                  className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-red)'
                />
                <div
                  className='absolute top-1/2 -translate-y-1/2 right-2'
                  onClick={() => setShowPass(!showPass)}>
                  {!showPass ? (
                    <EyeIcon className='size-4 text-back/30 cursor-pointer' />
                  ) : (
                    <EyeClosed className='size-4 text-back/30 cursor-pointer' />
                  )}
                </div>
              </div>
              <FieldError name='password' />
            </div>
          </div>
        </FormProvider>

        <div
          className='absolute group top-4 right-4 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/20 transition-colors duration-200'
          onClick={() => closeTheModal()}>
          <XIcon className='size-4 group-hover:text-white' />
        </div>

        {/* BUTTON - LOGIN */}
        <button
          onClick={form.handleSubmit(onSubmit)}
          className='my-4 py-2 px-4 rounded-3xl text-center text-white w-full bg-(--color-navy) cursor-pointer hover:bg-(--color-navy-hover)'>
          Login
        </button>

        <div className='text-center text-sm my-4'>
          Or
          <Link
            href={RoutesName.SIGNUP}
            className='mx-1 font-medium text-(--color-red) underline hover:text-(--color-navy-hover)'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
