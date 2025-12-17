'use client';

import { getTablesAvailable } from '@/api/table';
import FieldError from '@/components/field/error/FieldError';
import { FieldSelect } from '@/components/field/select/FieldSelect';
import { ICart } from '@/models/cart.model';
import { ITable, TABLE_STATUS } from '@/models/table.model';
import { useNotify } from '@/providers/NotifyProvider';
import { RoutesName } from '@/routes/contanst';
import { getErrorMessage } from '@/utils/errorHandle';
import { addOrderItemActions } from '@/utils/handleOrder';
import { useUser } from '@/utils/useUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ModalComponent from '../ModalComponent';
import schema from './schema';

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  cart: ICart;
};

const isTableList = function isTableList(obj: unknown): obj is ITable[] {
  return (
    Array.isArray(obj) &&
    obj.every(
      (item) =>
        (item && typeof item.label === 'string' && typeof item.value === 'number') ||
        (typeof item.value === 'string' && TABLE_STATUS.includes(item.status))
    )
  );
};

export const CheckoutConfirmationModal = ({ isModalOpen, setIsModalOpen, cart }: ModalProps) => {
  const [tables, setTables] = useState<ITable[] | null>(null);
  const { notify } = useNotify();
  const { userProfile } = useUser();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const memoTable = useMemo<ITable[] | null>(() => tables, [tables]);

  useEffect(() => {
    const fetchAllTablesAvailable = async () => {
      try {
        const response = await getTablesAvailable();

        if (!isTableList(response.data)) {
          throw new Error('Some thing went wrong when fetch table');
        }
        setTables(response.data);
      } catch (error) {
        notify(getErrorMessage(error), 'error');
      }
    };

    fetchAllTablesAvailable();
  }, []);

  const onSubmit = async (data: { table: string }) => {
    try {
      if (userProfile && data.table) {
        const table: ITable | undefined = tables?.find((table) => table.value === data.table);
        if (table) {
          const response = await addOrderItemActions({
            cart,
            table: table,
            userId: userProfile._id,
            notify,
          });
          if (response) {
            setTimeout(() => {
              router.push(RoutesName.ORDER);
            }, 1000);
            setIsModalOpen(false);
          }
        }
      }
    } catch (error) {
      notify(getErrorMessage(error), 'error');
    }
  };

  return (
    <ModalComponent
      title={<h2 className='text-center text-2xl font-medium'>Checkout</h2>}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={form.handleSubmit(onSubmit)}
      okText='Confirm checkout'
      onCancel={() => setIsModalOpen(false)}>
      {!!memoTable && (
        <FormProvider {...form}>
          <div className='modal-body w-full my-5'>
            <label className='inline-block text-sm font-bold mb-1'>Table number</label>
            <FieldSelect options={memoTable} name='table' placeholder='Select your table' />
            <FieldError name='table' />
          </div>
        </FormProvider>
      )}
    </ModalComponent>
  );
};
