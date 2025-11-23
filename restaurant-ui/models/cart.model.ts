export type ItemProduct = {
  productId: string;
  foodName: string;
  quantity: number;
  price: number;
  productImage?: string;
};

export interface ICart {
  _id: string;
  userId: string;
  cartNumber: string;
  items: ItemProduct[];
  subTotal: number;
  serviceCost: number;
  deliveryCost: number;
  totalCost: number;
}

export interface ICartRequest {
  userId: string;
  items: ItemProduct[];
  serviceCost: number;
  deliveryCost: number;
}
