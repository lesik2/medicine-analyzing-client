import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@alfalab/core-components/typography";
import { Button } from "@alfalab/core-components/button";
import { useCallback, useEffect, useState } from "react";
import { schema } from "./sсhema";
import styles from './index.module.css'
import { config } from "./constants";
import { ControlledInput } from "@/components/ControledInput";
import { AppNotification } from "@/components/AppNotification";
import { AppErrors } from "@/constants/errors";
import { useApiSend } from "@/hooks/useApiSend";
import { resetPasswordEmailConfig } from "@/api/auth";

type Inputs = {
    email: string;
};

export const SendMailPage = ()=>{
  const [showNotification, setShowNotification] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema) });
  const [isReset, setIsReset] = useState(false)
  const {
    setError,
    reset,
    formState: { isValid, isSubmitting },
  } = methods;

  const {
    mutate,
    error,
    isSuccess
  } = useApiSend< {email:string},void>({
    ...resetPasswordEmailConfig,
    error: () => {
      setShowNotification(true);
    },
    success: ()=>{
      setShowNotification(true);
    }
  });


  const handleCloseNotification = useCallback(()=>{
    setShowNotification(false)
  },[])

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate(data);
    handleCloseNotification();
    setIsReset(false);
  };


  useEffect(() => {
    if (error) {
      setError('root', { message: error.message });
    }
    if(isSuccess){
      reset();
      setIsReset(true)
    }
  }, [error, setError,isSuccess,reset]);

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
          <Typography.Text
            tag="p"
            color="primary"
            view="primary-large"
          >
            {config.text}
          </Typography.Text>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.formWrapper}
        >
            <ControlledInput
              {...config.emailField}
              methods={methods}
              size="l"
              required={true}
              isReset={isReset}
            />

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
          badge={isSuccess? 'positive-checkmark': 'negative-cross'}
          title={isSuccess?config.successSendingTitle :AppErrors.wrongInput}
        >
          {isSuccess? config.successSendingMessage  :error?.response?.data.message}
        </AppNotification>
      </div>
    </div>
  )
}