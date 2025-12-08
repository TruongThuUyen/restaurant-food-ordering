'use client';
import { register } from '@/api/auth';
import { getCities } from '@/api/city';
import FieldError from '@/components/field/error/FieldError';
import { FieldInput } from '@/components/field/input/FieldInput';
import { FieldSelect } from '@/components/field/select/FieldSelect';
import { ICity } from '@/models/city.model';
import { IRegister } from '@/models/user.model';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { cityList } from '@/utils/data';
import { getErrorMessage } from '@/utils/errorHandle';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, EyeClosed, EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import schema from './schema';

function isCityList(obj: unknown): obj is ICity[] {
  return (
    Array.isArray(obj) &&
    obj.every((item) => item && typeof item.label === 'string' && typeof item.value === 'string')
  );
}

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const { notify } = useNotify();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      city: undefined,
      address: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await getCities();
        if (response && typeof response === 'object' && 'data' in response) {
          if (!isCityList(response.data)) {
            throw new Error('Something when wrong!');
          }
        }
      } catch (error) {
        setCities(cityList);
        notify(getErrorMessage(error), 'error');
      }
    };

    fetchCity();
  }, []);

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
      notify(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='w-full sm:w-100 mx-auto px-6 sm:px-5 py-5 sm:rounded-xl bg-white sm:border-1 sm:border-[#020c4a]'>
        <div className='flex justify-between items-center'>
          <p className='capitalize text-(--color-red) text-xl sm:text-2xl font-medium'>
            Create an account
          </p>
          <Link
            href={RoutesName.HOME}
            className='relative group flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'>
            <ArrowLeft size={16} />

            <span className='absolute bottom-[-30px] sm:bottom-auto sm:left-full ml-2 px-2 py-1 bg-fuchsia-100 text-xs rounded shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
              Back home
            </span>
          </Link>
        </div>
        {/* FORM CONTAINER */}
        <FormProvider {...form}>
          <div className='flex flex-col gap-4 md:gap-5 my-6'>
            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Full name</p>
              <FieldInput
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
              <FieldInput
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
                <FieldInput
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
                <FieldSelect name='city' placeholder='Select your city' options={cities} />
              </div>
              <FieldError name='city' />
            </div>

            <div className='flex-1'>
              <p className='text-[#929194] text-sm my-1'>Address</p>
              <FieldInput
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
