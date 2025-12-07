'use client';
import { getProducts } from '@/api/products';
import { FinalPrice } from '@/components/FinalPrice';
import { IProduct, ProductSize } from '@/models/product.model';
import { useNotify } from '@/providers/NotifyProvider';
import { getErrorMessage } from '@/utils/errorHandle';
import { addItemToCartAction } from '@/utils/handleCart';
import { useUser } from '@/utils/useUser';
import { CheckIcon, ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [selectedSize, setSelectedSize] = useState<Record<string, ProductSize>>({});
  const [clickedMap, setClickedMap] = useState<Record<string, boolean>>({});

  const { notify } = useNotify();
  const { userProfile } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      try {
        const category = params.category;
        if (category && typeof category == 'string') {
          response = await getProducts(category);
          setProducts(response.data);
        }
      } catch (error: { status: number; message: string } | unknown) {
        getErrorMessage(error);
      }
    };

    fetchProducts();
  }, []);

  const addItemToCart = async (product: IProduct, size: ProductSize) => {
    setClickedMap((prev) => ({
      ...prev,
      [product._id]: true,
    }));

    setTimeout(() => {
      setClickedMap((prev) => ({
        ...prev,
        [product._id]: false,
      }));
    }, 1000);

    await addItemToCartAction({ product, size, userProfile, notify });
  };

  return (
    <div className='flex flex-wrap text-red-500'>
      {!!products &&
        products?.length > 0 &&
        products.map((product, index) => (
          <div
            key={product._id}
            className='relative w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-100'>
            {/* IMAGE CONTAINER */}
            {product.imageUrl && (
              <Link href={`/product/${product._id}`} className='relative h-[80%]'>
                <Image src={product.imageUrl} alt='' fill className='object-contain' />
              </Link>
            )}
            {/* TEXT CONTAINER */}
            <Link
              href={`/product/${product._id}`}
              className='text-2xl uppercase p-2 font-bold text-center'>
              {product.foodName}
            </Link>
            <div className='px-2 flex justify-between items-end'>
              {product?.options && (
                <select
                  className='border-1 border-red-400 text-xs py-1 px-2 outline-none'
                  value={selectedSize[product._id] ?? 'Medium'}
                  onChange={(e) =>
                    setSelectedSize((prev) => ({
                      ...prev,
                      [product._id]: e.target.value as ProductSize,
                    }))
                  }>
                  {product?.options.map((option) => (
                    <option key={option.title}>{option.title}</option>
                  ))}
                </select>
              )}
              <FinalPrice
                product={product}
                size={selectedSize[product._id] ?? 'Medium'}
                className='text-xl font-bold'
              />
            </div>
            <button
              className={`flex  items-center justify-center absolute right-3 cursor-pointer w-9 h-8
                      ${index % 2 !== 0 ? 'bg-[#f5f5f5]' : 'bg-[#F7CFEA]'}`}
              onClick={() => addItemToCart(product, selectedSize[product._id] ?? 'Medium')}>
              {!clickedMap[product._id] ? <ShoppingCartIcon size={21} /> : <CheckIcon size={21} />}
            </button>
          </div>
        ))}
    </div>
  );
};

export default CategoryPage;
