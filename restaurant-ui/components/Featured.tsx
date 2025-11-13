import { featuredProducts } from '@/data/data';
import { Product } from '@/models/Product';
import Image from 'next/image';

const Featured = ({ products }: { products: Product[] | [] }) => {
  console.log(products);
  return (
    <div className='w-screen overflow-x-scroll text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {products?.length > 0 &&
          products?.map((item) => (
            <div
              key={item._id}
              className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-100 transitoin-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h[90vh]'>
              {/* IMAGE CONTAINER */}
              {item.imageUrl && (
                <div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
                  <Image src={item.imageUrl} alt={item.altText} fill className='object-contain' />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <div className='flex-1 flex flex-col justify-center items-center gap-4 text-center'>
                <h1 className='text-xl font-bold uppercase'>{item.foodName}</h1>
                <p className='px-4 2xl:px-8'>{item.description}</p>
                <span className='text-xl font-bold xl:text-2xl 2xl:text-3xl'>{item.price}</span>
                <button className='bg-red-500 text-white p-2 rounded-md'>Add to Card</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Featured;
// 56:25
