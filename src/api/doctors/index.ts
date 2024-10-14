import { BASE_URL } from '@/http';
import { ApiGetConfig, ApiSendConfig } from '@/types';

const PATH = '/doctors'

export const getAllDoctorsConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['doctors', ...keys],
  url: `${BASE_URL}${PATH}`,
});


export const createDoctorConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'post',
};