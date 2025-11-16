'use client';
import { getProducts } from '@/api/products';
import { Product } from '@/models/Product';
import { useNotify } from '@/providers/NotifyProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const { notify } = useNotify();

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      try {
        const category = params.category;
        if (category && typeof category == 'string') {
          response = await getProducts(category);
          console.log(response);
          setProducts(response.data);
        }
      } catch (error: { status: number; message: string } | unknown) {
        let message = 'Failed to fetch data. Please try again later.';
        if (typeof error === 'object' && error && 'message' in error) {
          message = (error as { message: string }).message;
        }
        notify(message, 'error');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='flex flex-wrap text-red-500'>
      {!!products &&
        products?.length > 0 &&
        products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className='w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-100'>
            {/* IMAGE CONTAINER */}
            {product.imageUrl && (
              <div className='relative h-[80%]'>
                <Image src={product.imageUrl} alt='' fill className='object-contain' />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className='flex items-center justify-between font-bold'>
              <h1 className='text-2xl uppercase p-2'>{product.foodName}</h1>
              <h2 className='group-hover:hidden text-xl'>${product.price}</h2>
              <button className='hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md'>
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default CategoryPage;
