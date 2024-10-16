import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { config } from "./constants";
import { createDoctorConfig, updateDoctorConfig } from "@/api/doctors";
import { showNotificationAtom } from "@/atoms/notification";
import { useApiSend } from "@/hooks/useApiSend";
import { UpdateDoctor } from "@/types/doctor";
import { AppErrors } from "@/constants/errors";

interface useMutateDoctorProps{
    id: string|undefined;
    refetch: ()=>void;
    handleClose: ()=>void;
}

export const useMutateDoctor = ({id, refetch, handleClose}:useMutateDoctorProps)=>{

    const openNotification = useSetAtom(showNotificationAtom);
    const { mutate: create,  isSuccess: isSuccessCreate, isPending: isPendingCreate,error: errorCreate} = useApiSend<
    UpdateDoctor,
    UpdateDoctor
  >({
    ...createDoctorConfig,
  });
  const { mutate:update, isSuccess: isSuccessUpdate, isPending: isPendingUpdate,error: errorUpdate } = useApiSend<
    UpdateDoctor,
    UpdateDoctor
  >({
    ...updateDoctorConfig,
  });

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
  }, [isSuccessCreate,isSuccessUpdate, refetch, handleClose, openNotification]);

  useEffect(() => {
    if (errorCreate || errorUpdate) {

    const error =errorCreate?.response?.data.message || errorUpdate?.response?.data.message
      openNotification({
        title: AppErrors.generalError,
        message: error || '',
        badge: 'negative-cross',
      });
    }
  }, [errorCreate,errorUpdate, openNotification]);


  return{
    mutate: id?update: create,
    isPending: id? isPendingUpdate: isPendingCreate,
  }
}