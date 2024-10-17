import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import styles from './index.module.css'
import { config } from './constants';
import { AgeCategory } from '@/types';
import { Patient } from '@/types/patient';

interface PatientCard {
  ageCategory: AgeCategory;
  patient: Patient | null;
}

export const PatientCard = ({ ageCategory, patient }: PatientCard) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    if(!patient){
        return (
            <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.addCard}>
                <Typography.Title className={styles.cardTitle} view='small' weight='regular' tag='h2' color={isHovered? 'primary': 'secondary'}>{config.getAddPatientMessage(ageCategory)}</Typography.Title>
            </button>
        )
    }

    return (
        <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.addCard}>
            <Typography.Title className={styles.cardTitle} view='small' weight='regular' tag='h2' color={isHovered? 'primary': 'secondary'}>{config.getAddPatientMessage(ageCategory)}</Typography.Title>
        </button>
    )
};
