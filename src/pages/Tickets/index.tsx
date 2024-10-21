import { useCallback } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import styles from './index.module.css';
import { config } from './constants';
import { OrderTicketModal } from './OrderTicketModal';
import { useMutateAppointment } from './useMutateAppointment';
import { TicketCard } from './TicketCard';
import { Heading } from '@/components/Heading';
import { useModal } from '@/hooks/useModal';
import { useApiGet } from '@/hooks/useApiGet';
import { AppointmentResponseByPatient } from '@/types/appointment';
import { getAppointmentsByPatientConfig } from '@/api/appointments';
import { AppSpinner } from '@/components/AppSpinner';

export const TicketsPage = () => {
  const { isOpen, handleOpen, handleClose } = useModal();


  const { data, refetch, isFetching, isLoading } =
    useApiGet<AppointmentResponseByPatient>({
      ...getAppointmentsByPatientConfig([]),
    });

    const { mutate, isPending } = useMutateAppointment({refetch});

  const handleOrderTicket = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const showLoader = isFetching || isLoading;

  return (
    <>
      <div className={styles.pageWrapper}>
        <Heading
          title="Талоны"
          onClick={handleOrderTicket}
          buttonTxt={config.buttonTxt}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>
              <Typography.Title tag="h4" color="primary" view="small">
                {config.historyTitle}
              </Typography.Title>
            </div>
            <div className={styles.sectionContent}>
              {data?.history &&
                !showLoader &&
                data.history.length > 0 &&
                data.history.map((ticket) => (
                  <TicketCard key={ticket.id} {...ticket} isCompleted />
                ))}
              {!data?.history.length && !showLoader && (
                <Typography.Text
                  className={styles.notFoundTicketTitle}
                  view="primary-large"
                >
                  {config.noFoundAppointments}
                </Typography.Text>
              )}
              {showLoader && (
                <div className={styles.spinnerWrapper}>
                  <AppSpinner />
                </div>
              )}
            </div>
          </div>

          <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>
              <Typography.Title tag="h4" color="primary" view="small">
                {config.upcomingTitle}
              </Typography.Title>
            </div>
            <div className={styles.sectionContent}>
              {data?.upcoming &&
                !showLoader &&
                data.upcoming.length > 0 &&
                data.upcoming.map((ticket) => (
                  <TicketCard key={ticket.id} {...ticket} />
                ))}
              {!data?.upcoming.length && !showLoader && (
                <Typography.Text
                  className={styles.notFoundTicketTitle}
                  view="primary-large"
                >
                  {config.noFoundAppointments}
                </Typography.Text>
              )}
              {showLoader && (
                <div className={styles.spinnerWrapper}>
                  <AppSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <OrderTicketModal
          mutate={mutate}
          isPending={isPending}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
