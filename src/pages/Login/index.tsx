import { Typography } from '@alfalab/core-components/typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@alfalab/core-components/button';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { Link } from '@alfalab/core-components/link';
import styles from './index.module.css';
import { config } from './constants';
import { schema } from './shema';
import { ControlledInput } from '@/components/ControledInput';
import { AppNotification } from '@/components/AppNotification';
import { AppErrors } from '@/constants/errors';
import { RoutePaths } from '@/routes/route-paths';

type Inputs = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { isValid, isSubmitting },
  } = methods;
  const [showNotification, setShowNotification] = useState(false);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

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
      <Link href={RoutePaths.REGISTER}>
          <Typography.Text tag="span" color="primary" view='primary-medium'>
            {config.link}
          </Typography.Text>
        </Link>
      <AppNotification
        onClose={handleCloseNotification}
        visible={showNotification}
        badge="negative-cross"
        title={AppErrors.wrongSignInTitle}
      >
        {AppErrors.wrongSignInMessage}
      </AppNotification>
    </div>
      
    </div>
  );
};
