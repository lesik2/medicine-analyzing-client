import { Typography } from '@alfalab/core-components/typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@alfalab/core-components/button';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { Link } from '@alfalab/core-components/link';
import { useSetAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { config } from './constants';
import { schema } from './shema';
import { ControlledInput } from '@/components/ControledInput';
import { AppNotification } from '@/components/AppNotification';
import { AppErrors } from '@/constants/errors';
import { Routes } from '@/constants/routes';
import { useApiSend } from '@/hooks/useApiSend';
import { loginConfig } from '@/api/auth';
import { AuthUser } from '@/types/auth';
import { authUserAtom } from '@/atoms/auth';
import { StorageKeys } from '@/constants/localStorage';


type Inputs = {
  email: string;
  password: string;
};

interface LoginProps{
  email: string;
  password: string;
  token?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search? location.search.slice(1): undefined
  const setAuthUser = useSetAtom(authUserAtom);
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    setError,
    formState: { isValid, isSubmitting },
  } = methods;
  const [showNotification, setShowNotification] = useState(false);

  const {
    mutate,
    error,
    data: response,
  } = useApiSend<LoginProps, AuthUser>({
    ...loginConfig,
    error: () => {
      setShowNotification(true);
    },
  });

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    
    mutate({...data,token});
    setShowNotification(false);
  };

  useEffect(() => {
    if (response) {
      setAuthUser(response);
      localStorage.setItem(StorageKeys.accessToken, response.accessToken);
      localStorage.setItem(StorageKeys.refreshToken, response.refreshToken);
      navigate(Routes.PROFILE);
    }
  }, [response, setAuthUser, navigate]);

  useEffect(() => {
    if (error) {
      setError('root', { message: error.message });
    }
  }, [error, setError]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperContent}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.formWrapper}
        >
          <Typography.Title
            tag="h2"
            color="primary"
            view="medium"
            className={styles.title}
          >
            {config.title}
          </Typography.Title>
          <div className={styles.inputsWrapper}>
            <ControlledInput
              {...config.emailField}
              methods={methods}
              size="l"
              required={true}
            />
            <ControlledInput
              size="l"
              {...config.passwordField}
              methods={methods}
              required={true}
              type="password"
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
        <div className={styles.linksWrapper}>
          <Link href={Routes.REGISTER}>
            <Typography.Text tag="span" color="primary" view="primary-medium">
              {config.linkRegister}
            </Typography.Text>
          </Link>
          <Link href={Routes.REGISTER}>
            <Typography.Text tag="span" color="primary" view="primary-medium">
              {config.linkForgotPassword}
            </Typography.Text>
          </Link>
        </div>

        <AppNotification
          onClose={handleCloseNotification}
          visible={showNotification}
          badge="negative-cross"
          title={AppErrors.wrongSignInTitle}
        >
          {error?.response?.data.message}
        </AppNotification>
      </div>
    </div>
  );
};
