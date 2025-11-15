import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getProducts = (param?: string) => {
  return AxiosClient.get(END_POINT.PRODUCT.GET_PRODUCTS(param));
};

const getProductById = (id: string) => {
  return AxiosClient.get(END_POINT.PRODUCT.GET_PRODUCT_BY_ID(id));
};

export { getProducts, getProductById };
