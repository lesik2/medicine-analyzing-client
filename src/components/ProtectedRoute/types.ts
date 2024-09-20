import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  redirectPath?: string;
  children: ReactNode;
}
