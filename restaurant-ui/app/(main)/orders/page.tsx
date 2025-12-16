'use client';

import { getOrdersListByUserId } from '@/api/order';
import { OrderDetailsModal } from '@/components/popup/order/page';
import { IOrder, ORDER_STATUS_MAP } from '@/models/order.model';
import { useNotify } from '@/providers/NotifyProvider';
import { getErrorMessage } from '@/utils/errorHandle';
import { formatDate } from '@/utils/functions';
import { isOrdersList } from '@/utils/handleOrder';
import { useUser } from '@/utils/useUser';
import { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const { userProfile } = useUser();
  const { notify } = useNotify();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userProfile) {
          const response = await getOrdersListByUserId(userProfile._id);
          if (response.data) {
            if (!isOrdersList(response.data)) {
              throw new Error('Something wrong went get your orders list!');
            }

            setOrders(response.data);
          }
        }
      } catch (error) {
        notify(getErrorMessage(error), 'error');
      }
    };

    fetchOrders();
  }, [!!userProfile]);

  return (
    <div className='px-4 lg:px-20 xl:px-40 my-10'>
      {orders?.length > 0 && (
        <div className=''>
          {/* Table header */}
          <div className='grid grid-cols-4 md:grid-cols-9 font-bold bg-[#aebac8] divide-x-1 divide-[#fcfcfc] text-center text-sm rounded-t-lg'>
            <span className='py-4 px-[6px]'>Order ID</span>
            <span className='py-4 px-[6px]'>Date</span>
            <span className='py-4 px-[6px] hidden md:block'>Table</span>
            <span className='py-4 px-[6px]'>Total</span>
            <span className='col-span-4 py-4 px-[6px] hidden md:block'>Products</span>
            <span className='py-4 px-[6px]'>Status</span>
          </div>

          {/* Table body */}
          <div className='text-sm rounded-b-lg overflow-hidden border-[#d9d9d9] shadow-[0_10px_20px_-3px_rgba(0,0,0,0.1),0_10px_8px_-2px_rgba(0,0,0,0.05)]'>
            {orders.map((order) => (
              <div
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedOrder(order);
                }}
                key={order._id}
                className={`grid grid-cols-4 md:grid-cols-9 divide-x-1 divide-gray-200 text-center items-stretch even:bg-[#f5e6e3] cursor-pointer`}>
                <span className='h-full flex items-center justify-center py-3 px-[6px]'>
                  {order.orderId}
                </span>
                <span className='h-full flex items-center justify-center py-3 px-[6px]'>
                  {formatDate(order.date)}
                </span>
                <span className='h-full hidden md:flex items-center justify-center py-3 px-[6px]'>
                  {123}
                </span>
                <span className='h-full flex items-center justify-center py-3 px-[6px]'>
                  {order.totalPrice}
                </span>
                <div className='hidden md:block h-full line-clamp-2 col-span-4 py-3 px-[6px] text-start'>
                  {order.items.map((item, index) => (
                    <span key={item.productId + item.size}>
                      {item.foodName}(<b>{item.quantity}</b>)
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <div className='h-full flex items-center justify-center font-medium py-3 px-[6px]'>
                  <span
                    className={`flex items-center justify-center px-3 py-1 rounded-2xl 
                      ${ORDER_STATUS_MAP[order.status].background} ${
                      ORDER_STATUS_MAP[order.status].color
                    }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {!!selectedOrder && (
              <OrderDetailsModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                order={selectedOrder}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
