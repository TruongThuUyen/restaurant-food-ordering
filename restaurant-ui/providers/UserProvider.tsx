'use client';
import { getProfile } from '@/api/auth';
import { STORAGE_KEY } from '@/constants/storage';
import { IUser } from '@/models/user.model';
import { getSessionStorage } from '@/utils/storage_actions';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface UserContextType {
  userProfile: IUser | null;
  setUserProfile: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const token = getSessionStorage(STORAGE_KEY.USER_TOKEN);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    };

    fetchProfile();
    getProfile()
      .then((res) => setUserProfile(res.data))
      .catch((error) => {
        throw new Error('Has error occurred when set user profile!');
      });
  }, [token]);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>{children}</UserContext.Provider>
  );
};
