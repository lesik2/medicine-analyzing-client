import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue, useSetAtom } from 'jotai';
import styles from './index.module.css';
import { doctorSpecialtyOptions } from '@/constants/doctorSpecialty';
import { getSpecialtyAtom, setSpecialtyAtom } from '@/atoms/orderTicket';

interface DoctorSpecialtyStepProps {
  handleNextStep: () => void;
}

export const DoctorSpecialtyStep = ({
  handleNextStep,
}: DoctorSpecialtyStepProps) => {
  const setSpecialty = useSetAtom(setSpecialtyAtom);
  const specialtyValue = useAtomValue(getSpecialtyAtom);

  const handleClick = (specialty: string) => () => {
    handleNextStep();
    setSpecialty(specialty);
  };

  return (
    <div className={styles.wrapper}>
      {doctorSpecialtyOptions.map(({ key, content }) => (
        <button
          key={key}
          onClick={handleClick(key)}
          className={
            specialtyValue === key ? styles.doctorCardActive : styles.doctorCard
          }
        >
          <Typography.Text view="primary-medium">{content}</Typography.Text>
        </button>
      ))}
    </div>
  );
};
