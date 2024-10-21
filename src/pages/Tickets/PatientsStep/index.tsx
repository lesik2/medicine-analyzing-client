import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue, useSetAtom } from 'jotai';
import styles from './index.module.css';
import { getAllPatientsConfig } from '@/api/patients';
import { useApiGet } from '@/hooks/useApiGet';
import { PatientCard } from '@/types/patient';
import { AppSpinner } from '@/components/AppSpinner';
import {
  getDateAndTimeAtom,
  getPatientAtom,
  setPatientIdAtom,
} from '@/atoms/orderTicket';

interface PatientsStepProps {
  handleNextStep: () => void;
}

export const PatientsStep = ({ handleNextStep }: PatientsStepProps) => {
  const setPatient = useSetAtom(setPatientIdAtom);
  const patientValue = useAtomValue(getPatientAtom);
  const dateAndTimeValue = useAtomValue(getDateAndTimeAtom);
  const { data, isLoading, isFetching } = useApiGet<PatientCard[]>({
    ...getAllPatientsConfig,
    options: {
      enabled: Boolean(dateAndTimeValue),
    },
  });
  const handleClick = (id: string, fullName: string) => () => {
    handleNextStep();
    setPatient({
      id,
      fullName,
    });
  };

  const showLoader = isLoading || isFetching;

  if (showLoader) {
    return (
      <div className={styles.spinnerWrapper}>
        <AppSpinner />
      </div>
    );
  }

  const defineActiveCardStyles = (id: string, active: boolean) => {
    if (patientValue) {
      return patientValue.id === id
        ? styles.patientCardActive
        : styles.patientCard;
    }

    if (active) {
      return styles.patientCardActive;
    }

    return styles.patientCard;
  };

  return (
    <div className={styles.wrapper}>
      {data?.length ? (
        data.map(({ id, fullName, dateOfBirth, active }) => (
          <button
            key={id}
            onClick={handleClick(id, fullName)}
            className={defineActiveCardStyles(id, active)}
          >
            <Typography.Text view="primary-medium">{fullName}</Typography.Text>
            <Typography.Text color="secondary" view="primary-small">
              {dateOfBirth}
            </Typography.Text>
          </button>
        ))
      ) : (
        <Typography.Title tag="h3" view="small">
          У вас нет еще пациентов
        </Typography.Title>
      )}
    </div>
  );
};
