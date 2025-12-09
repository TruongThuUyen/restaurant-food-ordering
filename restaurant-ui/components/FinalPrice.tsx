'use client';
import { IProduct, ProductSize } from '@/models/product.model';
import { getFinalPrice } from '@/utils/functions';
import React, { useMemo } from 'react';

type Props = {
  product: IProduct;
  size: ProductSize;
  className: string;
};

const FinalPriceComponent = ({ product, size, className }: Props) => {
  const finalPrice = useMemo(() => {
    const price = getFinalPrice(product, size);
    return price;
  }, [product, size]);

  return <p className={className}>{finalPrice}</p>;
};

export const FinalPrice = React.memo(FinalPriceComponent);
