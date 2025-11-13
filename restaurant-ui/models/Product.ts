interface Product {
  _id: string;
  foodName: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  ingredients: [string];
  imageUrl: string;
  altText: string;
  rating: number;
}

export type { Product };
