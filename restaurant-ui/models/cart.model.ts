export type ItemProduct = {
  productId: string;
  foodName: string;
  quantity: number;
  price: number;
};

export interface ICart {
  _id: string;
  userId: string;
  cartNumber: string;
  items: ItemProduct[];
  serviceCost: number;
  deliveryCost: number;
  totalCost: number;
}
