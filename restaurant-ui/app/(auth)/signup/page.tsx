'use client';
import { register } from '@/api/auth';
import FieldError from '@/components/field/error/FieldError';
import { FiledInput } from '@/components/field/input/FieldInput';
import { FiledSelect } from '@/components/field/select/FieldSelect';
import { IResponseError } from '@/models/response.model';
import { IRegister } from '@/models/user.model';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { getErrorMessage } from '@/utils/errorHandle';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { EyeClosed, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import schema from './schema';

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const { notify } = useNotify();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const response = await register(data);
      if (response.status === 2000) {
        notify('Register successfully!', 'success');
        setTimeout(() => {
          router.push(RoutesName.LOGIN);
        }, 2000);
      }
    } catch (error) {
      let errorMessage = getErrorMessage(error);
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as IResponseError;

        if (serverError) {
          errorMessage = serverError.message;
        }
      }

      notify(errorMessage, 'error');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='w-full sm:w-100 mx-auto px-6 sm:px-5 py-5 sm:rounded-xl bg-white sm:border-1 sm:border-[#020c4a]'>
        <p className='capitalize text-(--color-red) text-xl sm:text-2xl font-medium'>
          Create an account
        </p>
        {/* FORM CONTAINER */}
        <FormProvider {...form}>
          <div className='flex flex-col gap-4 md:gap-5 my-6'>
            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Full name</p>
              <FiledInput
                name='fullName'
                placeholder='Enter your fullname'
                type='text'
                required
                className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-navy)'
              />
              <FieldError name='fullName' />
            </div>
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

            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Address</p>
              <FiledInput
                name='address'
                placeholder='Enter your address'
                type='text'
                required
                className='w-full text-sm p-2 border-1 border-black/60 rounded-md outline-(--color-navy)'
              />
              <FieldError name='address' />
            </div>
          </div>
        </FormProvider>
        {/* BUTTON - REGISTER */}
        <button
          onClick={form.handleSubmit(onSubmit)}
          className='my-3 md:my-4 py-2 px-4 rounded-3xl text-center text-white w-full bg-(--color-red) cursor-pointer hover:bg-(--color-red-hover)'>
          Register
        </button>

        <div className='text-center text-sm my-3 md:my-4'>
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
