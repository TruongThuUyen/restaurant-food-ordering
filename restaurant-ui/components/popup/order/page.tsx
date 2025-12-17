'use client';

import { IOrder, ORDER_STATUS_MAP } from '@/models/order.model';
import ModalComponent from '../ModalComponent';
import Image from 'next/image';
import { formatDate } from '@/utils/functions';

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  order: IOrder;
};

export const OrderDetailsModal = ({ isModalOpen, setIsModalOpen, order }: ModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalComponent
      title={
        <h2 className='text-center text-lg md:text-xl font-medium capitalize mb-5'>
          Order details
        </h2>
      }
      closable
      open={isModalOpen}
      // okText='Ok'
      // onOk={handleOk}
      style={{ top: 30 }}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => setIsModalOpen(false)}
      className='lg:min-w-[800px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-[6px] text-sm'>
        <div>
          <b>Order ID:</b> {order.orderId}
        </div>
        <div>
          <b>Order time:</b> {formatDate(order.date)}
        </div>
        <div>
          <b>Table:</b> Table 1
        </div>
        <div>
          <b>Order Status:</b>
          <div className='inline-block ml-2'>
            <span
              className={`flex items-center justify-center px-3 py-[2px] rounded-2xl 
            ${ORDER_STATUS_MAP[order.status].background} ${ORDER_STATUS_MAP[order.status].color}`}>
              {order.status}
            </span>
          </div>
        </div>
        <div className='font-medium text-red-600'>
          <b className='text-black'>Total:</b> {order.totalPrice}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 my-8 max-h-[240px] sm:max-h-[360px] overflow-y-auto'>
        {order.items.map((product) => (
          <div
            key={product.productId + product.size}
            className='w-full border border-[#d9d9d9] rounded-xl'>
            <div className='relative w-full h-27 md:h-32 border-b border-[#d9d9d9]'>
              <Image
                src={product.productImage ?? '/default-thumbnail.jpg'}
                alt=''
                fill
                className='object-contain'
              />
            </div>
            <div className='py-2 px-2 text-sm leading-[20px]'>
              <p className='font-medium'>
                {product.foodName}({product.quantity})
              </p>
              <p>
                <b>Size: </b>
                {product.size}
              </p>
              <p className='text-red-600 font-medium'>
                <b className='text-black'>Price: </b>
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ModalComponent>
  );
};
