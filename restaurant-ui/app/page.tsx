'use client';

import { getProducts } from '@/api/products';
import Featured from '@/components/Featured';
import Offer from '@/components/Offer';
import Slider from '@/components/Slider';
import { useNotify } from '@/providers/NotifyProvider';
import { useEffect } from 'react';

export default function Home() {
  const { notify } = useNotify();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
    };
    notify('fetch data successfully', 'warning');

    fetchProducts();
  }, []);

  return (
    <main>
      {/* {} */}
      <Slider />
      <Featured />
      <Offer />
    </main>
  );
}
