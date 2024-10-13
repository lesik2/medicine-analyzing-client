import { BASE_URL } from '@/http';
import { ApiGetConfig } from '@/types';

export const getAllDoctorsConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['doctors', ...keys],
  url: `${BASE_URL}/doctors`,
});
