import { Button } from '@alfalab/core-components/button';
import { Modal } from '@alfalab/core-components/modal';
import { Steps } from '@alfalab/core-components/steps';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import moment from 'moment';
import styles from './index.module.css';
import { config, DATA, OrderTicketStep } from './constants';
import { DoctorSpecialtyStep } from '../DoctorSpecialtyStep';
import { DoctorsStep } from '../DoctorsStep';
import { DateAndTimeStep } from '../DateAndTimeStep';
import { PatientsStep } from '../PatientsStep';
import { TicketStep } from '../TicketStep';
import { clearOrderTicketAtom, orderTicketAtom } from '@/atoms/orderTicket';
import { Appointment } from '@/types/appointment';
import { YYYY_MM_DD_HH_MM_MOMENT_DATE_FORMAT } from '@/constants/date';

interface OrderTicketModalProps {
  handleClose: () => void;
  mutate: (data: Appointment) => void;
  isPending: boolean;
}

export const OrderTicketModal = ({
  handleClose,
  mutate,
  isPending,
}: OrderTicketModalProps) => {
  const [step, setStep] = useState(OrderTicketStep.SPECIALTY);

  const orderTicketValue = useAtomValue(orderTicketAtom);
  const clearOrderTicket = useSetAtom(clearOrderTicketAtom);
  const item = DATA.find((item) => item.id === step)!;

  const handleCloseModal = useCallback(() => {
    handleClose();
    clearOrderTicket();
  }, [handleClose, clearOrderTicket]);

  const handleStepNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleStepBack = useCallback(() => {
    if (step === OrderTicketStep.SPECIALTY) {
      handleCloseModal();
    } else {
      setStep(step - 1);
    }
  }, [handleCloseModal, step]);

  const handleStepsChange = (stepNumber: number) => {
    if (stepNumber <= step) {
      setStep(stepNumber);
    }
  };

  const handleOrderTicket = useCallback(() => {
    mutate({
      doctorId: orderTicketValue.doctor?.id,
      patientId: orderTicketValue.patient?.id,
      dateAndTime: moment(orderTicketValue.dateAndTime).format(
        YYYY_MM_DD_HH_MM_MOMENT_DATE_FORMAT,
      ),
    });

    handleCloseModal();
  }, [handleCloseModal, orderTicketValue, mutate]);

  return (
    <Modal
      open={true}
      onClose={handleCloseModal}
      fixedPosition={true}
      size={800}
    >
      <Modal.Header hasCloser={true} title="Заказ талона" />
      <Modal.Content flex={true}>
        <Steps
          fullWidth
          activeStep={step}
          defaultActiveStep={0}
          onChange={handleStepsChange}
        >
          {DATA.map((item, key) => (
            <Typography.Text
              className={styles.stepText}
              tag="p"
              view="primary-medium"
              key={key}
            >
              {item.title}
            </Typography.Text>
          ))}
        </Steps>
        <div className={styles.stepContent}>
          {step === OrderTicketStep.SPECIALTY && (
            <DoctorSpecialtyStep handleNextStep={handleStepNext} />
          )}
          {step === OrderTicketStep.DOCTOR && (
            <DoctorsStep handleNextStep={handleStepNext} />
          )}
          {step === OrderTicketStep.DATE_AND_TIME && (
            <DateAndTimeStep handleNextStep={handleStepNext} />
          )}
          {step === OrderTicketStep.PATIENTS && (
            <PatientsStep handleNextStep={handleStepNext} />
          )}
          {step === OrderTicketStep.ORDER && <TicketStep />}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Controls
          secondary={
            step === OrderTicketStep.ORDER && (
              <Button
                view="primary"
                onClick={handleOrderTicket}
                loading={isPending}
              >
                {config.primaryBtnText}
              </Button>
            )
          }
          primary={
            <Button view="secondary" onClick={handleStepBack}>
              {item.btnText}
            </Button>
          }
        />
      </Modal.Footer>
    </Modal>
  );
};
