import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponseError } from '@customTypes/index';
import axiosConfig from '@/http';

interface UseApiGetProps<T> {
  keys: unknown[];
  url: string;
  options?: Omit<
    UseQueryOptions<T, AxiosError<ServerResponseError>>,
    'queryKey'
  >;
  params?: object;
}

export const useApiGet = <T>({
  keys,
  url,
  options,
  params,
}: UseApiGetProps<T>) => {
  return useQuery<T, AxiosError<ServerResponseError>>({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosConfig.get<T>(url, {
        params: params,
      });
      return response.data;
    },
    ...options,
  });
};
