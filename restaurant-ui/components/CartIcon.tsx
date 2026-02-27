import { RoutesName } from '@/routes/contanst';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type CartProps = {
  onClose?: () => void;
};

const CartIcon = ({ onClose }: CartProps) => {
  const t = useTranslations('navbar');

  return (
    <Link href={RoutesName.CART} className='flex gap-1 items-center' onClick={() => onClose?.()}>
      <div className='relative w-8 h-8 md:w-5 md:h-5'>
        <Image src='/cart.png' alt='card' fill />
      </div>
      {t('cart')}
    </Link>
  );
};

export default CartIcon;
