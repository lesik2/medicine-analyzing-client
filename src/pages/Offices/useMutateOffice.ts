import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { config } from "./constants";
import { createOfficeConfig, updateOfficeConfig } from "@/api/offices";
import { AppErrors } from "@/constants/errors";
import { useApiSend } from "@/hooks/useApiSend";
import { UpdateOffice } from "@/types/office";
import { showNotificationAtom } from "@/atoms/notification";

interface useMutateOfficeProps{
    id: string|undefined;
    refetch: ()=>void;
    handleClose: ()=>void;
}

export const useMutateOffice =({id,refetch, handleClose}:useMutateOfficeProps)=>{
    const openNotification = useSetAtom(showNotificationAtom);
    const { mutate: create, isSuccess: isSuccessCreate, isPending: isPendingCreate,error: errorCreate } = useApiSend<
    UpdateOffice,
    UpdateOffice
  >({
    ...createOfficeConfig,
  });

  const { mutate: update, isSuccess: isSuccessUpdate, isPending: isPendingUpdate,error: errorUpdate } = useApiSend<
    UpdateOffice,
    UpdateOffice
  >({
    ...updateOfficeConfig,
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


