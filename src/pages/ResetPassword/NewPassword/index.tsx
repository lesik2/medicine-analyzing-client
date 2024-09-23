import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@alfalab/core-components/typography";
import { Button } from "@alfalab/core-components/button";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { schema } from "./schema";
import styles from './index.module.css'
import { config } from "./constants";
import { ControlledInput } from "@/components/ControledInput";
import { useApiSend } from "@/hooks/useApiSend";
import { AuthUser } from "@/types/auth";
import { restorePasswordConfig } from "@/api/auth";
import { useModal } from "@/hooks/useModal";
import { AppNotification } from "@/components/AppNotification";
import { AppModal } from "@/components/AppModal";
import { AppErrors } from "@/constants/errors";

type Inputs = {
    newPassword: string;
    confirmPassword: string;
};

interface ResetPassword{
  userId?: string;
  token?: string;
  newPassword: string;
}


export const NewPasswordPage = ()=>{

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || undefined;
  const userId = params.get('id') || undefined;
    const [showNotification, setShowNotification] = useState(false);
    const {isOpen, handleClose,handleOpen} = useModal();
    const [isReset, setIsReset] = useState(false);

    const methods = useForm({ resolver: yupResolver(schema) });
    const {
      setError,
      reset,
      formState: { isValid, isSubmitting },
    } = methods;

    const { mutate, error,isSuccess } = useApiSend<
    ResetPassword,
    AuthUser
  >({
    ...restorePasswordConfig,
    error: () => {
      setShowNotification(true);
    },
  });

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

    const handleSubmit: SubmitHandler<Inputs> = async (data) => {
      mutate({token, userId, newPassword: data.newPassword})
      setIsReset(false);
      setShowNotification(false);
    };

    useEffect(() => {
      if (error) {
        setError('root', { message: error.message });
      }
      if(isSuccess){
        handleOpen();
        setIsReset(true);
        reset()
      }
    }, [error, setError,isSuccess,handleOpen,reset]);


    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapperContent}>
        <Typography.Title
              tag="h2"
              color="primary"
              view="medium"
              className={styles.title}
            >
              {config.title}
            </Typography.Title>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className={styles.formWrapper}
          >
              <div className={styles.inputsWrapper}>
            <ControlledInput
              size="l"
              {...config.newPasswordField}
              methods={methods}
              required={true}
              type="password"
              isReset={isReset}
            />
            <ControlledInput
              size="l"
              {...config.confirmPasswordField}
              methods={methods}
              required={true}
              type="password"
              isReset={isReset}
            />
          </div>
  
            <Button
              block={true}
              type="submit"
              view="primary"
              className={styles.sumbitButton}
              disabled={!isValid}
              loading={isSubmitting}
            >
              {config.button}
            </Button>
          </form>
          <AppNotification
          onClose={handleCloseNotification}
          visible={showNotification}
          badge="negative-cross"
          title={AppErrors.wrongInput}
        >
          {error?.response?.data.message}
        </AppNotification>
          <AppModal isOpen={isOpen} handleClose={handleClose} {...config.modal}/>
        </div>
      </div>
    )
}