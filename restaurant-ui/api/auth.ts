import { ILogin, IRegister } from '@/models/user.model';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';

const login = async (data: ILogin) => {
  return AxiosClient.post(END_POINT.AUTH.LOGIN, data);
};

const register = async (data: IRegister) => {
  return AxiosClient.post(END_POINT.AUTH.REGISTER, data);
};

const getProfile = async () => {
  return AxiosClient.post(END_POINT.AUTH.PROFILE);
};

export { getProfile, login, register };
