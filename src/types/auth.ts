import { Roles } from './roles';

export interface AuthUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  isEmailConfirmed: boolean;
  refreshToken: string;
  accessToken: string;
  role: Roles;
}
