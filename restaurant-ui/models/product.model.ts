export type ProductSize = 'Small' | 'Medium' | 'Large';

export interface IProduct {
  _id: string;
  foodName: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  ingredients: string[];
  imageUrl: string;
  altText: string;
  rating: number;
  options?: {
    title: ProductSize;
    additionalPrice: number;
  }[];
}
