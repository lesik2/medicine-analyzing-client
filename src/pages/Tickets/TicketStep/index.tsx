import { useAtomValue } from 'jotai';
import moment from 'moment';
import { TicketCard } from '../TicketCard';
import { orderTicketAtom } from '@/atoms/orderTicket';
import { FULL_DATE_MOMENT_FORMAT } from '@/constants/date';
import './constants';
import { Specialty } from '@/types';

export const TicketStep = () => {
  const orderTicket = useAtomValue(orderTicketAtom);
  const dateAndTimeFormatted = moment(orderTicket.dateAndTime).format(
    FULL_DATE_MOMENT_FORMAT,
  );
  return (
    <>
      <TicketCard
        dateAndTime={dateAndTimeFormatted}
        specialty={orderTicket.specialty as Specialty}
        doctorFullName={orderTicket.doctor?.fullName || ''}
        patientFullName={orderTicket.patient?.fullName || ''}
        officeNumber={orderTicket.doctor?.officeNumber}
      />
    </>
  );
};
