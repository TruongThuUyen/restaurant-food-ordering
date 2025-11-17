'use client';
import LoginModal from '@/components/popup/login/Login';
import { RoutesName } from '@/routes/contanst';
import { LogInIcon, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center'>
      {/* BOX */}
      <div className=' h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[60%] 2xl:w-1/2'>
        {/* IMAGE CONTAINER */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image src='/loginBg.png' alt='' fill className='object-cover' />
        </div>
        {/* FORM CONTAINER */}
        <div className='p-10 flex flex-col gap-4 md:gap-6 md:w-1/2'>
          <h1 className='font-bold text-xl xl:text-3xl'>Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button
            onClick={() => setShowModal(true)}
            className='flex gap-3 py-[10px] px-4 bg-[#020c4a] hover:bg-[#0b1e78] text-white rounded-3xl justify-center items-center cursor-pointer'>
            <LogInIcon className='size-5' />
            <span>Sign in</span>
          </button>
          <div className='flex items-center'>
            <span className='inline-block h-[1px] bg-gray-200 w-full'></span>
            <span className='inline-block px-4'>OR</span>
            <span className='inline-block h-[1px] bg-gray-200 w-full'></span>
          </div>
          <button
            onClick={() => {
              router.push(RoutesName.SIGNUP);
            }}
            className='flex gap-3 py-[10px] px-4 bg-(--color-red) hover:bg-(--color-red-hover) text-white rounded-3xl justify-center items-center cursor-pointer'>
            <UserPlus className='size-5' />
            <span>Sign up</span>
          </button>
          <p className='text-sm mt-2'>
            Have a problem?
            <Link className='underline mx-2' href='#'>
              Contact us
            </Link>
          </p>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showModal && <LoginModal onClose={setShowModal} />}
    </div>
  );
};

export default LoginPage;
