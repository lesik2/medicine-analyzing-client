import { Route, Routes as BrowserRoutes } from 'react-router-dom';
import { lazy } from 'react';

import { Routes } from '@constants/routes';
import { HeaderLayout } from '@/layouts/HeaderLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(async () => ({
  default: (await import('@/pages/Home')).HomePage,
}));
const LoginPage = lazy(async () => ({
  default: (await import('@/pages/Login')).LoginPage,
}));
const RegisterPage = lazy(async () => ({
  default: (await import('@/pages/Register')).RegisterPage,
}));
const ProfilePage = lazy(async () => ({
  default: (await import('@/pages/Profile')).ProfilePage,
}));
const TicketsPage = lazy(async () => ({
  default: (await import('@/pages/Tickets')).TicketsPage,
}));
const SendMailPage = lazy(async () => ({
  default: (await import('@/pages/ResetPassword/SendMail')).SendMailPage,
}));
const NewPasswordPage = lazy(async () => ({
  default: (await import('@/pages/ResetPassword/NewPassword')).NewPasswordPage,
}));
const NotFoundPage = lazy(async () => ({
  default: (await import('@/pages/Not-found')).NotFound,
}));

export const AppRoutes = () => {
  return (
    <BrowserRoutes>
      <Route element={<HeaderLayout />}>
        <Route index element={<HomePage />} />
        <Route path={Routes.LOGIN} element={<LoginPage />} />
        <Route path={Routes.REGISTER} element={<RegisterPage />} />
        <Route path={Routes.SEND_MAIL} element={<SendMailPage />} />
        <Route path={Routes.NEW_PASSWORD} element={<NewPasswordPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={Routes.PROFILE} element={<ProfilePage />} />
          <Route path={Routes.TICKETS} element={<TicketsPage />} />
        </Route>
      </Route>
      <Route path={Routes.NOT_FOUND} element={<NotFoundPage />} />
    </BrowserRoutes>
  );
};
