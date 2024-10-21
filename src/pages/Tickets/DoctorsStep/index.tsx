import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue, useSetAtom } from 'jotai';
import styles from './index.module.css';
import { doctorSpecialty } from '@/constants/doctorSpecialty';
import {
  getDoctorAtom,
  getSpecialtyAtom,
  setDoctorIdAtom,
} from '@/atoms/orderTicket';
import { useApiGet } from '@/hooks/useApiGet';
import { DoctorResponseBySpecialty } from '@/types/doctor';
import { getDoctorsBySpecialtyConfig } from '@/api/doctors';
import { AppSpinner } from '@/components/AppSpinner';

interface DoctorsStepProps {
  handleNextStep: () => void;
}

export const DoctorsStep = ({ handleNextStep }: DoctorsStepProps) => {
  const specialtyValue = useAtomValue(getSpecialtyAtom);
  const doctorValue = useAtomValue(getDoctorAtom);
  const setDoctor = useSetAtom(setDoctorIdAtom);
  const { data, isLoading, isFetching } = useApiGet<
    DoctorResponseBySpecialty[]
  >({
    ...getDoctorsBySpecialtyConfig(specialtyValue, [specialtyValue]),
    options: {
      enabled: Boolean(specialtyValue),
    },
  });

  const handleClick =
    (id: string, fullName: string, officeNumber: number) => () => {
      handleNextStep();
      setDoctor({
        id,
        fullName,
        officeNumber,
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

  return (
    <div className={styles.wrapper}>
      {data?.length ? (
        data.map(({ id, fullName, officeNumber, specialty }) => (
          <button
            key={id}
            onClick={handleClick(id, fullName, officeNumber)}
            className={
              doctorValue?.id === id
                ? styles.doctorCardActive
                : styles.doctorCard
            }
          >
            <Typography.Text view="primary-medium">{fullName}</Typography.Text>
            <Typography.Text
              color="secondary"
              view="primary-small"
            >{`${doctorSpecialty[specialty]}, каб.${officeNumber}`}</Typography.Text>
          </button>
        ))
      ) : (
        <Typography.Title tag="h3" view="small">
          В данной специальности нет врача
        </Typography.Title>
      )}
    </div>
  );
};
