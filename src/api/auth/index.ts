import { ApiGetConfig, ApiSendConfig } from '@/types';

const BASE_URL = 'auth'

export const loginConfig: ApiSendConfig = {
  url: `${BASE_URL}/login`,
  method: 'post',
};

export const registerConfig: ApiSendConfig = {
  url: `${BASE_URL}/signup`,
  method: 'post',
};

export const logoutConfig: ApiGetConfig ={
  keys: ['logout'],
  url: `${BASE_URL}/logout`,
}