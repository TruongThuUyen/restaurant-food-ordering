import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getProducts = () => {
  return AxiosClient.get(END_POINT.PRODUCT);
};

export { getProducts };
