import { Typography } from '@alfalab/core-components/typography';
import { memo } from 'react';
import styles from './index.module.css';
import { formatFullName } from '@/utils/formatFullName';
import { doctorSpecialty } from '@/constants/doctorSpecialty';
import { Specialty } from '@/types';

interface TickerCardProps {
  dateAndTime: string;
  patientFullName: string;
  specialty: Specialty;
  doctorFullName: string;
  officeNumber: number | undefined;
  isCompleted?: boolean;
}

const TicketCardInner = ({
  dateAndTime,
  patientFullName,
  specialty,
  doctorFullName,
  officeNumber,
  isCompleted = false,
}: TickerCardProps) => {
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
    </div>
  );
};

export const TicketCard = memo(TicketCardInner);
