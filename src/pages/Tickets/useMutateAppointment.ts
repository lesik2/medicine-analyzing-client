import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { config } from './constants';
import { createAppointmentConfig } from '@/api/appointments';
import { showNotificationAtom } from '@/atoms/notification';
import { useApiSend } from '@/hooks/useApiSend';
import { Appointment } from '@/types/appointment';
import { AppErrors } from '@/constants/errors';

interface useMutateAppointmentProps{
  refetch: ()=>void;
}

export const useMutateAppointment = ({refetch}:useMutateAppointmentProps) => {
  const openNotification = useSetAtom(showNotificationAtom);

  const { mutate, isSuccess, isPending, error } = useApiSend<Appointment>({
    ...createAppointmentConfig,
  });

  useEffect(() => {
    if (isSuccess) {
      openNotification({
        title: config.notificationTitle,
        message: config.notificationMessage,
        badge: 'positive-checkmark',
      });
      refetch()
    }
  }, [isSuccess, openNotification,refetch]);

  useEffect(() => {
    if (error) {
      openNotification({
        title: AppErrors.generalError,
        message: error?.response?.data.message || '',
        badge: 'negative-cross',
      });
    }
  }, [error, openNotification]);

  return {
    mutate,
    isPending,
  };
};
