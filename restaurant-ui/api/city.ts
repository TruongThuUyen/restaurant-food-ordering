import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getCities = async <ICityResponse>() => {
  return AxiosClient.get<ICityResponse>(END_POINT.CITY.GET_ALL);
};

export { getCities };
