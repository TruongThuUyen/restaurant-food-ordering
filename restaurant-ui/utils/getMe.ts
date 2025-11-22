import { getProfile } from '@/api/auth';

export const getMe = async () => {
  try {
    const response = await getProfile();
    if (response.status == 2000) {
      return {
        status: 1,
        data: response.data,
      };
    }
  } catch (error) {
    return {
      status: 0,
      message: 'Get my profile has failed!',
      error: error,
    };
  }
};
