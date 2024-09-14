import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RoutePaths } from './route-paths';
import { HeaderLayout } from '@/layouts/HeaderLayout';

const HomePage = lazy(async () => ({
  default: (await import('@/pages/Home')).HomePage,
}));
const LoginPage = lazy(async () => ({
  default: (await import('@/pages/Login')).LoginPage,
}));
const RegisterPage = lazy(async () => ({
  default: (await import('@/pages/Register')).RegisterPage,
}));
const NotFoundPage = lazy(async () => ({
  default: (await import('@/pages/Not-found')).NotFound,
}));

export const AppRoutes = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route index element={<HomePage />} />
            <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
            <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />
            <Route path={RoutePaths.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
