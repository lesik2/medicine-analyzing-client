import { BASE_URL } from '@/http';
import { ApiGetConfig, ApiSendConfig } from '@/types';

const PATH = '/patients';

export const getAllPatientsPatternConfig: ApiGetConfig = {
  keys: ['patients-pattern'],
  url: `${BASE_URL}${PATH}/pattern`,
};

export const getAllPatientsConfig: ApiGetConfig = {
  keys: ['patients'],
  url: `${BASE_URL}${PATH}`,
};

export const createPatientConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'post',
};

export const updatePatientConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'patch',
};

export const changeActivePatientConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}/active`,
  method: 'patch',
};

export const deletePatientConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'delete',
};

export const getPatientConfig = (
  id: string | undefined,
  keys: unknown[],
): ApiGetConfig => ({
  keys: ['patient', ...keys],
  url: `${BASE_URL}${PATH}/${id}`,
});
