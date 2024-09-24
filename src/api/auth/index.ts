import { ApiGetConfig, ApiSendConfig } from '@/types';

const BASE_URL = 'auth';

export const loginConfig: ApiSendConfig = {
  url: `${BASE_URL}/login`,
  method: 'post',
};

export const registerConfig: ApiSendConfig = {
  url: `${BASE_URL}/signup`,
  method: 'post',
};

export const logoutConfig: ApiGetConfig = {
  keys: ['logout'],
  url: `${BASE_URL}/logout`,
};

export const resendConfirmationEmailConfig: ApiSendConfig = {
  url: `${BASE_URL}/resend`,
  method: 'post',
};

export const resetPasswordEmailConfig: ApiSendConfig = {
  url: `${BASE_URL}/recall`,
  method: 'post',
};

export const restorePasswordConfig: ApiSendConfig = {
  url: `${BASE_URL}/restore`,
  method: 'post',
};
