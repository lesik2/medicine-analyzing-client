import { BASE_URL } from '@/http';
import { ApiGetConfig, ApiSendConfig } from '@/types';

const PATH = '/appointment';

export const getTimeSlotsConfig = (keys: unknown[]): ApiGetConfig => ({
  keys: ['time-slots', ...keys],
  url: `${BASE_URL}${PATH}`,
});

export const createAppointmentConfig: ApiSendConfig = {
  url: `${BASE_URL}${PATH}`,
  method: 'post',
};

export const getAppointmentsByPatientConfig = (
  keys: unknown[],
): ApiGetConfig => ({
  keys: ['appointments-patients', ...keys],
  url: `${BASE_URL}${PATH}/patients`,
});
