import { useEffect, useState } from 'react';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue, useSetAtom } from 'jotai';
import moment from 'moment';
import styles from './index.module.css';
import { useApiGet } from '@/hooks/useApiGet';
import { getTimeSlotsConfig } from '@/api/appointments';
import {
  getDateAndTimeAtom,
  getDoctorAtom,
  setDateAndTimeAtom,
} from '@/atoms/orderTicket';
import { AppSpinner } from '@/components/AppSpinner';
import {
  HH_MM_MOMENT_TIME_FORMAT,
  YYYY_MM_DD_MOMENT_DATE_FORMAT,
} from '@/constants/date';

interface DoctorsStepProps {
  handleNextStep: () => void;
}

export const DateAndTimeStep = ({ handleNextStep }: DoctorsStepProps) => {
  const doctorValue = useAtomValue(getDoctorAtom);
  const dateAndTimeValue = useAtomValue(getDateAndTimeAtom);
  const setDateAndTime = useSetAtom(setDateAndTimeAtom);
  const [date, setDate] = useState<number | undefined>(undefined);

  const {
    data: timeSlots,
    isLoading,
    isFetching,
  } = useApiGet<string[]>({
    ...getTimeSlotsConfig([doctorValue?.id, date]),
    params: {
      date: moment(date).format(YYYY_MM_DD_MOMENT_DATE_FORMAT),
      doctorId: doctorValue?.id,
    },
    options: {
      enabled: Boolean(doctorValue?.id) && Boolean(date),
    },
  });

  const handleChangeDate = (newDate?: number) => {
    setDate(newDate);
    setDateAndTime(0);
  };

  const handleClick = (time: string) => () => {
    const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
    const combinedDateTime = moment(date)
      .set({
        hour: hours,
        minute: minutes,
      })
      .valueOf();
    setDateAndTime(combinedDateTime);
    handleNextStep();
  };

  const showLoader = isFetching || isLoading;

  const textToDisplay = date
    ? 'Нет свободного времени для записи'
    : 'Выберите дату для записи';

  const chosenTime = moment(dateAndTimeValue).format(HH_MM_MOMENT_TIME_FORMAT);

  useEffect(() => {
    if (dateAndTimeValue) {
      setDate(dateAndTimeValue);
    }
  }, [dateAndTimeValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendarWrapper}>
        <CalendarDesktop
          value={date}
          responsive={true}
          onChange={handleChangeDate}
          selectorView={'month-only'}
          showCurrentYearSelector={true}
          minDate={moment().add(1, 'days').valueOf()}
        />
      </div>
      <div className={styles.timeWrapper}>
        {showLoader && (
          <div className={styles.spinnerWrapper}>
            <AppSpinner />
          </div>
        )}
        {timeSlots &&
          timeSlots.length > 0 &&
          !showLoader &&
          timeSlots.map((timeSlot) => (
            <button
              onClick={handleClick(timeSlot)}
              key={timeSlot}
              className={
                chosenTime === timeSlot
                  ? styles.timeCardActive
                  : styles.timeCard
              }
            >
              <Typography.Text view="primary-medium">
                {timeSlot}
              </Typography.Text>
            </button>
          ))}

        {!timeSlots?.length && !showLoader && (
          <Typography.Title className={styles.title} tag="h3" view="small">
            {textToDisplay}
          </Typography.Title>
        )}
      </div>
    </div>
  );
};
