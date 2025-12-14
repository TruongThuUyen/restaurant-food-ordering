'use client';
import { addToCart, decreaseItemQuantity, getCartByUserId, removeItem } from '@/api/cart';
import { CheckoutConfirmationModal } from '@/components/popup/cart/CheckoutConfirmationModal';
import { ICart, ItemProduct } from '@/models/cart.model';
import { IResponseError } from '@/models/response.model';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { getErrorMessage } from '@/utils/errorHandle';
import { totalCost } from '@/utils/functions';
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
  STORAGE,
} from '@/utils/storage';
import { useUser } from '@/utils/useUser';
import axios from 'axios';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const defaultCart: ICart = {
  _id: '',
  userId: '',
  cartNumber: '',
  items: [],
  subTotal: 0,
  serviceCost: 0,
  deliveryCost: 0,
  totalCost: 0,
};

const CartPage = () => {
  const [cart, setCart] = useState<ICart>(defaultCart);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const router = useRouter();
  const { notify } = useNotify();
  const { userProfile } = useUser();

  useEffect(() => {
    const userCart = getSessionStorage(STORAGE.USER_CART);
    if (userCart) {
      Promise.resolve().then(() => {
        setCart(JSON.parse(userCart));
      });
    }
  }, []);

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

  const checkout = () => {
    if (!userProfile) {
      router.push(RoutesName.LOGIN);
    }
    setShowCheckoutModal(true);
  };

  const handleProductQuantity = async (add: boolean, product: ItemProduct) => {
    if (userProfile) {
      try {
        let newCart: ICart | undefined = undefined;
        if (!add) {
          const reqBody = {
            _id: cart._id,
            productId: product.productId,
            productSize: product.size,
          };

          const response = await decreaseItemQuantity(reqBody);
          newCart = response.data;
        } else {
          const reqBody = {
            userId: cart.userId,
            items: [
              {
                foodName: product.foodName,
                productId: product.productId,
                quantity: 1,
                size: product.size,
              },
            ],
            deliveryCost: 0,
            serviceCost: 0,
          };
          const response = await addToCart(reqBody);
          newCart = response.data;
        }
        if (!!newCart) setCart(newCart);
      } catch (error) {
        notify(`${getErrorMessage(error)}\nPlease try again!`, 'error');
      }
    } else {
      // Remove item in storage
      const cartFromStorage = getSessionStorage(STORAGE.USER_CART);
      if (cartFromStorage) {
        const cart: ICart = JSON.parse(cartFromStorage);

        const index = cart.items.findIndex(
          (item) => item.productId === product.productId && item.size === product.size
        );
        if (index !== -1) {
          if (add) {
            cart.items[index].quantity += 1;
          } else {
            if (cart.items[index].quantity > 1) {
              cart.items[index].quantity -= 1;
            } else {
              cart.items.splice(index, 1);
            }
          }
          // If items in cart is empty -> remove cart
          if (cart.items.length === 0) {
            removeSessionStorage(STORAGE.USER_CART);
          } else {
            cart.subTotal = cart.items.reduce((total, product) => {
              return total + product.price * product.quantity;
            }, 0);
            cart.totalCost = totalCost(cart.subTotal, cart.deliveryCost, cart.serviceCost);
            setSessionStorage(STORAGE.USER_CART, JSON.stringify(cart));
          }
          setCart(cart);
        } else {
          notify('Something went wrong!\nPlease train again!', 'error');
        }
      }
    }
  };

  const removeItemFromCart = async (productId: string, productSize: string) => {
    if (userProfile) {
      try {
        const reqBody = {
          _id: cart._id,
          productId: productId,
          productSize: productSize,
        };
        const response = await removeItem(reqBody);
        if (response && response.data) {
          const newCart: ICart = response.data;
          setCart(newCart);
        }
      } catch (error) {
        notify(`${getErrorMessage(error)}\nPlease try again!`, 'error');
      }
    } else {
      const cartFromStorage = getSessionStorage(STORAGE.USER_CART);
      if (cartFromStorage) {
        const cart = JSON.parse(cartFromStorage) as ICart;
        const index = cart.items.findIndex(
          (item) => item.productId === productId && item.size === productSize
        );
        if (index !== -1) {
          cart.items.splice(index, 1);
        } else {
          notify(`Cannot remove item from cart!\nPlease try again!`, 'error');
        }

        // If items in cart is empty -> remove cart
        if (cart.items.length === 0) {
          removeSessionStorage(STORAGE.USER_CART);
        } else {
          cart.subTotal = cart.items.reduce((total, product) => {
            return total + product.price * product.quantity;
          }, 0);
          cart.totalCost = totalCost(cart.subTotal, cart.deliveryCost, cart.serviceCost);
          setSessionStorage(STORAGE.USER_CART, JSON.stringify(cart));
        }
        setCart(cart);
      }
    }
  };

  return (
    <div className='h-[calc(100%-6rem)] md:h-[calc(100%-9rem)]'>
      {!!cart && cart?.items?.length > 0 ? (
        <div className='flex flex-col items-stretch text-red-500 lg:flex-row'>
          {/* PRODUCT CONTAINER */}
          <div className='h-[calc(100vh/2)] px-4 py-4 flex flex-col justify-center lg:h-[calc(100vh*2/3)] lg:w-2/3 lg:px-18 xl:px-26'>
            <div className='grid grid-cols-8 gap-4 items-center font-bold text-red-500 text-lg border-b py-3'>
              <span>Product</span>
              <span className='col-span-3 ml-7 sm:ml-3'>Food Name</span>
              <span className='text-center'>Qty</span>
              <span>Price</span>
              <span>Total</span>
              <span></span>
              <span></span>
            </div>
            <div className='flex-1 overflow-y-auto mt-4'>
              {!!cart?.items &&
                cart.items.map((product) => (
                  /* SINGLE ITEM */
                  <div
                    key={`${product.productId}${product.size}`}
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
                      <span>{product.size}</span>
                    </div>
                    <div className='flex items-center gap-2 justify-center'>
                      <button
                        className='w-6 h-5 cursor-pointer hover:bg-[#f5f5f5] flex items-center justify-center'
                        onClick={() => handleProductQuantity(false, product)}>
                        -
                      </button>
                      <span className='inline-block font-bold'>{product.quantity}</span>
                      <button
                        className='w-6 h-5 cursor-pointer hover:bg-[#f5f5f5] flex items-center justify-center'
                        onClick={() => handleProductQuantity(true, product)}>
                        +
                      </button>
                    </div>
                    <h2 className='font-bold'>{product.price.toFixed(2)}</h2>
                    <h2 className='font-bold'>{(product.price * product.quantity).toFixed(2)}</h2>
                    <p
                      className='flex items-center justify-center w-6 h-6 hover:bg-fuchsia-100 cursor-pointer'
                      onClick={() => removeItemFromCart(product.productId, product.size)}>
                      <span>x</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* PAYMENT CONTAINER */}
          <div className='px-4 py-6 bg-fuchsia-100 flex flex-col gap-4 justify-center w-full lg:w-1/3 xl:px-26 2xl:text-xl 2xl:gap-6'>
            <div className='flex justify-between'>
              <span className=''>Subtotal ({cart.items.length} items)</span>
              <span className=''>${cart.subTotal.toFixed(2)}</span>
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
              <span className='text-red-500 font-bold'>{cart.totalCost.toFixed(2)}</span>
            </div>
            <button
              onClick={() => checkout()}
              className='bg-red-500 text-white text-base py-[6px] px-3 rounded-md w-1/2 self-end cursor-pointer hover:bg-red-600'>
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

      {!!showCheckoutModal && (
        <CheckoutConfirmationModal
          isModalOpen={showCheckoutModal}
          setIsModalOpen={setShowCheckoutModal}
          cart={cart}
        />
      )}
    </div>
  );
};

export default CartPage;
