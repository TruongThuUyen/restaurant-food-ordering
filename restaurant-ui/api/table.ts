import { UpdateStatusParam } from '@/models/order.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getTablesAvailable = () => {
  return AxiosClient.get(END_POINT.TABLE.GET_TABLES_AVAILABLE);
};

const updateState = async (params: UpdateStatusParam) => {
  return AxiosClient.patch(END_POINT.TABLE.UPDATE_STATUS, params);
};

export { getTablesAvailable, updateState };
