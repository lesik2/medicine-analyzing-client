import { Typography } from '@alfalab/core-components/typography';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '@alfalab/core-components/button';
import { Status } from '@alfalab/core-components/status';
import { useQueryClient } from '@tanstack/react-query';
import styles from './index.module.css';
import { config } from './constants';
import { formatFullName } from '@/utils/formatFullName';
import { doctorSpecialty } from '@/constants/doctorSpecialty';
import { Specialty } from '@/types';
import { AppModal } from '@/components/AppModal';
import { useApiSend } from '@/hooks/useApiSend';
import { cancelAppointmentConfig } from '@/api/appointments';

interface TickerCardProps {
  id: string;
  dateAndTime: string;
  patientFullName: string;
  specialty: Specialty;
  doctorFullName: string;
  officeNumber: number | undefined;
  isCompleted?: boolean;
  status: string;
  showCancelBtn?: boolean;
}

const TicketCardInner = ({
  id,
  dateAndTime,
  patientFullName,
  specialty,
  doctorFullName,
  officeNumber,
  isCompleted = false,
  status,
  showCancelBtn= false,
}: TickerCardProps) => {
const queryClient = useQueryClient();
   const {
      mutate: cancelAppoinment,
      isSuccess,
      isPending: isPendingCancel,
    } = useApiSend<string | undefined>({
      ...cancelAppointmentConfig,
    });

  const [idOfCanceledTicket, setIdOfCanceledTicket] = useState<
      string | undefined
    >(undefined);


   const handleCloseDeleteModal = useCallback(() => {
        setIdOfCanceledTicket(undefined);
      }, []);

   const handleDelete = useCallback(() => {
     cancelAppoinment(idOfCanceledTicket)
      handleCloseDeleteModal();
    }, [handleCloseDeleteModal,cancelAppoinment,idOfCanceledTicket]);

  const handleOpenDeleteModal = (id: string | undefined) => () => {
    setIdOfCanceledTicket(id);
  };

  useEffect(()=>{
    if(isSuccess){
      queryClient.invalidateQueries({queryKey: ['appointments-patients']}); 
    }

  },[isSuccess,queryClient])

  return (
    <div
      className={isCompleted ? styles.ticketCardDisabled : styles.ticketCard}
    >
      <Typography.Text view="primary-small">{dateAndTime}</Typography.Text>
      <Typography.Text color="primary" view="primary-medium">
        {`${doctorSpecialty[specialty]} ${formatFullName(doctorFullName)}, каб.${officeNumber}`}
      </Typography.Text>
      <Typography.Text color="secondary" view="primary-small">
        {formatFullName(patientFullName)}
      </Typography.Text>
      {!isCompleted && showCancelBtn && <Button className={styles.cancelBtn} size={32} view="secondary" onClick={handleOpenDeleteModal(id)}>
          Отменить запись
      </Button> }

        {status === 'canceled' &&<Status
        className={styles.cancelStatus}
        view={'muted'}
        size={24}
        color={'red'}
      >
        Отменена
      </Status>}
     

      {idOfCanceledTicket && (
              <AppModal
                isOpen={Boolean(idOfCanceledTicket)}
                handleClose={handleCloseDeleteModal}
                handlePrimaryClick={handleDelete}
                {...config.modal}
                showIcon={false}
                isPending={isPendingCancel}
              />
            )}
    </div>
  );
};

export const TicketCard = memo(TicketCardInner);
