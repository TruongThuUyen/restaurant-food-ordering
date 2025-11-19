'use client';
import { getProductById } from '@/api/products';
import Price from '@/components/Price';
import { Product } from '@/models/product.model';
import { useNotify } from '@/providers/NotifyProvider';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SingleProductPage = () => {
  const { notify } = useNotify();
  const [product, setProduct] = useState<Product | undefined>();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchProduct = async () => {
      let response;
      try {
        response = await getProductById(id as string);
        setProduct(response.data);
      } catch (error: { status: number; message: string } | unknown) {
        let message = 'Failed to fetch data. Please try again later.';

        if (typeof error === 'object' && error && 'message' in error) {
          message = (error as { message: string }).message;
        }
        notify(message, 'error');
      }
    };

    fetchProduct();
  }, []);

  return (
    !!product && (
      <div className='px-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center'>
        {/* IMAGE CONTAINER */}
        <div className='relative w-full h-1/2 md:h-[70%]'>
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.altText} fill className='object-contain' />
          )}
        </div>
        {/* TEXT CONTAINER */}
        <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
          <h1 className='text-3xl xl:text-5xl font-bold uppercase'>{product?.foodName}</h1>
          <p>{product?.description}</p>
          <Price
            price={product?.price || 0}
            id={product._id as string}
            options={product?.options}
          />
        </div>
      </div>
    )
  );
};

export default SingleProductPage;
