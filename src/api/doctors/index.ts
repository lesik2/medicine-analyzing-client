import { BASE_URL } from '@/http';
import { ApiGetConfig, ApiSendConfig } from '@/types';

const PATH = '/doctors';

export const getAllDoctorsConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['doctors', ...keys],
  url: `${BASE_URL}${PATH}`,
});

export const createDoctorConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'post',
};

export const updateDoctorConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'patch',
};

export const getDoctorConfig = (
  id: string | undefined,
  keys: unknown[],
): ApiGetConfig => ({
  keys: ['doctor', ...keys],
  url: `${BASE_URL}${PATH}/${id}`,
});

export const getDoctorsBySpecialtyConfig = (
  specialty: string | undefined,
  keys: unknown[],
): ApiGetConfig => ({
  keys: ['doctor-specialty', ...keys],
  url: `${BASE_URL}${PATH}/specialty/${specialty}`,
});
