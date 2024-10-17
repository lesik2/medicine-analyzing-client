import { BASE_URL } from '@/http';
import { ApiGetConfig, ApiSendConfig } from '@/types';

const PATH = '/offices';

export const getAllOfficesConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['offices', ...keys],
  url: `${BASE_URL}${PATH}`,
});

export const createOfficeConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'post',
};

export const updateOfficeConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'patch',
};

export const getFreeOfficesConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['free-offices', ...keys],
  url: `${BASE_URL}${PATH}/free`,
});

export const getOfficeConfig = (
  id: string | undefined,
  keys: unknown[],
): ApiGetConfig => ({
  keys: ['office', ...keys],
  url: `${BASE_URL}${PATH}/${id}`,
});
