import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponseError } from '@customTypes/index';
import axiosConfig from '@/http';

interface UseApiGetProps<T> {
  keys: string[];
  url: string;
  options?: Omit<
    UseQueryOptions<T, AxiosError<ServerResponseError>>,
    'queryKey'
  >;
}

export const useApiGet = <T>({ keys, url, options }: UseApiGetProps<T>) => {
  return useQuery<T, AxiosError<ServerResponseError>>({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosConfig.get<T>(url);
      return response.data;
    },
    ...options,
  });
};
