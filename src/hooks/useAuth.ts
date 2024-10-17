import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import axios from 'axios';
import { StorageKeys } from '@/constants/localStorage';
import { authUserAtom } from '@/atoms/auth';
import { AuthUser } from '@/types/auth';
import { BASE_URL, REFRESH_URL } from '@/http';

export const useAuth = () => {
  const setAuthUser = useSetAtom(authUserAtom);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem(StorageKeys.refreshToken);
      if (refreshToken) {
        try {
          const response = await axios.get<AuthUser>(
            `${BASE_URL}${REFRESH_URL}`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem(StorageKeys.accessToken, newAccessToken);
          setAuthUser(response.data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error);
          }
        }
      }
    };
    checkAuth();
  }, [setAuthUser]);
};
