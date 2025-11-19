'use client';

import { getProducts } from '@/api/products';
import Featured from '@/components/Featured';
import Offer from '@/components/Offer';
import Slider from '@/components/Slider';
import { IProduct } from '@/models/product.model';
import { useNotify } from '@/providers/NotifyProvider';
import { useEffect, useState } from 'react';

export default function Home() {
  const { notify } = useNotify();
  const [products, setProducts] = useState<IProduct[] | []>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      try {
        response = await getProducts();
        setProducts(response.data);
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
    <main>
      <Slider />
      <Featured products={products} />
      <Offer />
    </main>
  );
}
