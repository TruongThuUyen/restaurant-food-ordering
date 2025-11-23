'use client';
import { getCartByUserId } from '@/api/cart';
import { ICart } from '@/models/cart.model';
import { IResponseError } from '@/models/response.model';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { getErrorMessage } from '@/utils/errorHandle';
import { useUser } from '@/utils/useUser';
import axios from 'axios';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState<ICart>();
  const { notify } = useNotify();

  const { userProfile } = useUser();

  useEffect(() => {
    if (userProfile && userProfile._id) {
      const fetchCart = async () => {
        try {
          const response = await getCartByUserId(userProfile._id);
          if (response.status === 2000 && response?.data) {
            setCart(response.data);
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
      fetchCart();
    }
  }, [userProfile]);

  return (
    <div className='h-[calc(100%-6rem)] md:h-[calc(100%-9rem)]'>
      {!!cart && cart?.items?.length > 0 ? (
        <div className='flex flex-col items-stretch text-red-500 lg:flex-row'>
          {/* PRODUCT CONTAINER */}
          <div className='h-[calc(100vh/2)] px-4 py-4 flex flex-col justify-center lg:h-[calc(100vh*2/3)]  lg:w-2/3 lg:px-20 xl:px-30 '>
            <div className='grid grid-cols-8 items-center font-bold text-red-500 text-lg border-b py-3'>
              <span>Product</span>
              <span className='col-span-3 ml-7 sm:ml-3'>Food Name</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Total</span>
              <span className='col-span-6'></span>
            </div>
            <div className='flex-1 overflow-y-auto mt-4'>
              {!!cart?.items &&
                cart.items.map((product) => (
                  /* SINGLE ITEM */
                  <div
                    key={product.productId}
                    className='grid grid-cols-8 items-center gap-4 py-3 border-b'>
                    <div className='relative w-16 h-16 md:w-20 md:h-20'>
                      <Image
                        src={product.productImage ?? '/default-thumbnail.jpg'}
                        alt={product.productImage ?? ''}
                        fill
                      />
                    </div>
                    <div className='col-span-3 ml-7 sm:ml-3'>
                      <h1 className='uppercase text-sm md:text-xl font-bold'>{product.foodName}</h1>
                      <span>Large</span>
                    </div>
                    <h2 className='font-bold'>{product.quantity}</h2>
                    <h2 className='font-bold'>{product.price}</h2>
                    <h2 className='font-bold'>{product.price * product.quantity}</h2>
                    <p className='flex items-center justify-center w-5 h-5 hover:bg-fuchsia-100 cursor-pointer'>
                      <span>x</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* PAYMENT CONTAINER */}
          <div className='px-4 py-6 bg-fuchsia-100 flex flex-col gap-4 justify-center w-full lg:w-1/3 xl:px-30 2xl:text-xl 2xl:gap-6'>
            <div className='flex justify-between'>
              <span className=''>Subtotal ({cart.items.length} items)</span>
              <span className=''>${cart.subTotal}</span>
            </div>
            <div className='flex justify-between'>
              <span className=''>Service Cost </span>
              <span className=''>$0.00</span>
            </div>
            <div className='flex justify-between'>
              <span className=''> Delivery Cost</span>
              <span className='text-green-500'>
                {cart.deliveryCost > 0 ? cart.deliveryCost : 'FREE!'}
              </span>
            </div>
            <hr className='my-2 ' />

            <div className='flex justify-between'>
              <span className='uppercase text-xl'> Total(incl vat)</span>
              <span className='text-red-500 font-bold'>{cart.totalCost}</span>
            </div>
            <button className='bg-red-500 text-white text-base py-[6px] px-3 rounded-md w-1/2 self-end cursor-pointer hover:bg-red-600'>
              CHECKOUT
            </button>
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex flex-col items-center gap-6 '>
          <div className='h-[35%] py-10 w-full flex items-center justify-center shadow-md bg-[#fdfdfd]'>
            <ShoppingCartIcon className='size-36 text-orange-400' />
          </div>

          <h2 className='text-2xl sm:text-3xl font-medium text-black'>
            Your cart is <span className='capitalize text-red-600'>empty!</span>
          </h2>
          <p className='text-center'>Must add items on the cart before you proceed to checkout.</p>
          <button className='px-6 py-2 text-sm bg-red-500 hover:bg-red-600 rounded-xl text-white cursor-pointer'>
            <Link href={RoutesName.HOME}>Return to shop</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
