import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { config } from './constants';
import { AppErrors } from '@/constants/errors';
import { useApiSend } from '@/hooks/useApiSend';
import { showNotificationAtom } from '@/atoms/notification';
import { UpdateActiveStatus, UpdatePatient } from '@/types/patient';
import { changeActivePatientConfig, createPatientConfig, deletePatientConfig, updatePatientConfig } from '@/api/patients';

interface useMutateOfficeProps {
  id: string | undefined;
  refetch: () => void;
  handleClose: () => void;
  handleCloseDelete: ()=>void;
}

export const useMutatePatients = ({
  id,
  refetch,
  handleClose,
  handleCloseDelete
}: useMutateOfficeProps) => {
  const openNotification = useSetAtom(showNotificationAtom);
  const {
    mutate: create,
    isSuccess: isSuccessCreate,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useApiSend<UpdatePatient, UpdatePatient>({
    ...createPatientConfig,
  });

  const {
    mutate: deletePatient,
    isSuccess: isSuccessDelete,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useApiSend<string|undefined>({
    ...deletePatientConfig,
  });

  const {
    mutate: update,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useApiSend<UpdatePatient, UpdatePatient>({
    ...updatePatientConfig,
  });


  const {
    mutate: changeActiveStatus,
    isSuccess: isSuccessActiveStatus,
  } = useApiSend<UpdateActiveStatus, UpdateActiveStatus>({
    ...changeActivePatientConfig,
  });

  useEffect(()=>{
    if(isSuccessActiveStatus){
      refetch()
    }
  },[isSuccessActiveStatus,refetch])

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      handleClose();
      openNotification({
        title: config.notificationTitle,
        message: config.notificationMessage,
        badge: 'positive-checkmark',
      });
      refetch();
    }
  }, [
    isSuccessCreate,
    isSuccessUpdate,
    refetch,
    handleClose,
    openNotification,
  ]);

  useEffect(() => {
    if (isSuccessDelete) {
      handleCloseDelete();
      openNotification({
        title: config.notificationTitle,
        message: config.notificationMessageDelete,
        badge: 'positive-checkmark',
      });
      refetch();
    }
  }, [
    isSuccessDelete,
    refetch,
    openNotification,
    handleCloseDelete,
  ]);

  useEffect(() => {
    if (errorDelete) {
      handleCloseDelete()
      const error =
        errorDelete?.response?.data.message
      openNotification({
        title: AppErrors.generalError,
        message: error || '',
        badge: 'negative-cross',
      });
    }
  }, [errorDelete,openNotification,handleCloseDelete]);

  useEffect(() => {
    if (errorCreate || errorUpdate) {
      const error =
        errorCreate?.response?.data.message ||
        errorUpdate?.response?.data.message;
      openNotification({
        title: AppErrors.generalError,
        message: error || '',
        badge: 'negative-cross',
      });
    }
  }, [errorCreate, errorUpdate, openNotification]);

  return {
    mutate: id ? update : create,
    isPending: id ? isPendingUpdate : isPendingCreate,
    changeActiveStatus,
    deletePatient,
    isPendingDelete,
  };
};
