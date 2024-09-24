import { Navigate, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from './types';
import { Routes } from '@/constants/routes';
import { StorageKeys } from '@/constants/localStorage';

export function ProtectedRoute({
  redirectPath = Routes.LOGIN,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const authUser = localStorage.getItem(StorageKeys.authUser);

  if (!authUser) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children as JSX.Element;
}
