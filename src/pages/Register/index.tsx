import { Typography } from '@alfalab/core-components/typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@alfalab/core-components/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Modal } from '@alfalab/core-components/modal';
import { useCallback, useEffect, useState } from 'react';
import { Link } from '@alfalab/core-components/link';
import { CheckmarkMediumMIcon } from '@alfalab/icons-glyph/CheckmarkMediumMIcon';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import styles from './index.module.css';
import { config } from './constants';
import { schema } from './shema';
import { ControlledInput } from '@/components/ControledInput';
import { AppNotification } from '@/components/AppNotification';
import { AppErrors } from '@/constants/errors';
import { Routes } from '@/constants/routes';
import { useApiSend } from '@/hooks/useApiSend';
import { AuthUser } from '@/types/auth';
import { registerConfig, resendConfirmationEmail } from '@/api/auth';
import { useModal } from '@/hooks/useModal';

type Inputs = {
  name: string,
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterPage = () => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    setError,
    formState: { isValid, isSubmitting },
  } = methods;
  const [showNotification, setShowNotification] = useState(false);
  const {isOpen, handleClose,handleOpen} = useModal();
  const [email, setEmail] = useState('');
  const [isReset, setIsReset] = useState(false);

  const { mutate, error,isSuccess } = useApiSend<
    Omit<Inputs, 'confirmPassword'>,
    AuthUser
  >({
    ...registerConfig,
    error: () => {
      setShowNotification(true);
    },
  });

  const { mutate:resendMutation,isPending  } = useApiSend<
    {email:string},
    object
  >({
    ...resendConfirmationEmail,
  });

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password,name, surname} = data;
    setEmail(email);
    setIsReset(false);
    setShowNotification(false);
    mutate({ email, password,name, surname });
  };

  useEffect(() => {
    if (error) {
      setError('root', { message: error.message });
    }
  }, [error, setError]);

  useEffect(() => {
    if(isSuccess){
      handleOpen();
      setIsReset(true);
    }
  }, [isSuccess, handleOpen]);

  const handleResendClick = useCallback(()=>{
    resendMutation({email});
  },[email,resendMutation])

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
              {...config.nameField}
              methods={methods}
              size="l"
              required={true}
              isReset={isReset}
            />
            <ControlledInput
              {...config.surnameField}
              methods={methods}
              size="l"
              required={true}
              isReset={isReset}
            />
            <ControlledInput
              {...config.emailField}
              methods={methods}
              size="l"
              required={true}
              isReset={isReset}
            />
            <ControlledInput
              size="l"
              {...config.passwordField}
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
        <Link href={Routes.LOGIN}>
          <Typography.Text tag="span" color="primary" view="primary-medium">
            {config.link}
          </Typography.Text>
        </Link>
        <AppNotification
          onClose={handleCloseNotification}
          visible={showNotification}
          badge="negative-cross"
          title={AppErrors.wrongSignUpTitle}
        >
          {error?.response?.data.message}
        </AppNotification>
      </div>
      <ModalDesktop open={isOpen} onClose={handleClose}>
        <Modal.Header>
          <SuperEllipse className={styles.modalIconWrapper} border={true}>
            <CheckmarkMediumMIcon  className={styles.modalIcon}/>
          </SuperEllipse>
        </Modal.Header>
        <Modal.Content className={styles.modalContent}>
          <Typography.Title
            tag="h3"
            color="primary"
            view="small"
          >
            {config.modal.title}
          </Typography.Title>
          <Typography.Text
            tag="p"
            color="primary"
            view="primary-large"
            
          >
            {config.modal.getMessage(email)}
          </Typography.Text>
        </Modal.Content>
        <Modal.Footer>
          <Modal.Controls gap={24} layout='center'  primary={<Button size={48} view="primary" href={Routes.LOGIN}>
            {config.modal.primaryBtn}
          </Button>} secondary={<Button size={48} view="secondary" onClick={handleResendClick} loading={isPending}>
            {config.modal.secondaryBtn}
          </Button>}/>
        </Modal.Footer>
      </ModalDesktop>
    </div>
  );
};
