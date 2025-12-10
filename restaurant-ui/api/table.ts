import { UpdateStatusParam } from '@/models/table.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const getTablesAvailable = () => {
  return AxiosClient.get(END_POINT.TABEL.GET_TABLES_AVAILABLE);
};

const updateState = async (params: UpdateStatusParam) => {
  return AxiosClient.patch(END_POINT.TABEL.UPDATE_STATUS, params);
};

export { getTablesAvailable, updateState };
