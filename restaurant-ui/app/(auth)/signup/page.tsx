'use client';
import FieldError from '@/components/field/error/FieldError';
import { FiledInput } from '@/components/field/input/FieldInput';
import { FiledSelect } from '@/components/field/select/FieldSelect';
import { RoutesName } from '@/routes/contanst';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeClosed, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import scheme from './scheme';

interface FormValues {
  email?: string;
  password?: string;
}

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(form.getValues());
    console.log('data:: ', data);
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='w-[80%] sm:w-100 mx-auto p-5 rounded-xl bg-white border-1 border-[#020c4a]'>
        <p className='capitalize text-(--color-red) text-xl sm:text-2xl font-medium'>
          Create an account
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
                className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-navy)'
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
                  className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-navy)'
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

            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Choose your city</p>
              <div className='w-full relative'>
                <FiledSelect name='city' placeholder='Select your city' />
              </div>
              <FieldError name='city' />
            </div>
          </div>
        </FormProvider>
        {/* BUTTON - REGISTER */}
        <button
          onClick={form.handleSubmit(onSubmit)}
          className='my-4 py-2 px-4 rounded-3xl text-center text-white w-full bg-(--color-red) cursor-pointer hover:bg-(--color-red-hover)'>
          Register
        </button>

        <div className='text-center text-sm my-4'>
          Or
          <Link
            href={RoutesName.LOGIN}
            className='mx-1 font-medium text-(--color-navy) underline hover:text-(--color-navy-hover)'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
