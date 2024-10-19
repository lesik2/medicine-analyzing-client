import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponseError } from '@/types';
import axiosConfig from '@/http';

interface UseApiSendProps<T, R = unknown> {
  url: string;
  method: 'post' | 'patch' | 'delete';
  success?: (data: R) => void;
  error?: (error: AxiosError<ServerResponseError>) => void;
  invalidateKey?: unknown[];
  options?: UseMutationOptions<R, AxiosError<ServerResponseError>, T>;
}

export const useApiSend = <T, R=unknown>({
  url,
  method,
  success,
  error,
  invalidateKey,
  options,
}: UseApiSendProps<T, R>): UseMutationResult<
  R,
  AxiosError<ServerResponseError>,
  T
> => {
  const queryClient = useQueryClient();

  return useMutation<R, AxiosError<ServerResponseError>, T>({
    mutationFn: async (data: T) => {

      if(method === 'delete'){
        const response = await axiosConfig[method]<R>(`${url}/${data}`);
        return response.data;
      }
      const response = await axiosConfig[method]<R>(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
      if (success) {
        success(data);
      }
    },
    onError: (err) => {
      if (error) {
        error(err);
      }
    },
    retry: 1,
    ...options,
  });
};
