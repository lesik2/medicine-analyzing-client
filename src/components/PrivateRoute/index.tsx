import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { Roles } from '@/types/roles';
import { StorageKeys } from '@/constants/localStorage';
import { AuthUser } from '@/types/auth';

interface PrivateRouteProps {
  available: Roles[];
  redirectPath?: Routes;
}

export function PrivateRoute({
  available,
  redirectPath = Routes.NOT_FOUND,
}: PrivateRouteProps) {
  const authUserString = localStorage.getItem(StorageKeys.authUser);
  const authUser = authUserString
    ? (JSON.parse(authUserString) as AuthUser)
    : null;

  if (!authUser || !available.includes(authUser.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
