import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';
import styles from './index.module.css';
import { buttonsItems, config, getNameOfAgeCategory } from './constants';
import { AgeCategory } from '@/types';
import { Patient, UpdateActiveStatus } from '@/types/patient';

interface PatientCard {
  ageCategory: AgeCategory;
  patient: Patient | null;
  onClick?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  changeActiveStatus?: (data: UpdateActiveStatus) => void;
}

const PatientCardInner = ({
  ageCategory,
  patient,
  onClick,
  changeActiveStatus,
  handleEdit,
  handleDelete,
}: PatientCard) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEditCard = () => {
    if (handleEdit) {
      handleEdit();
    }
  };

  const handleDeleteCard = () => {
    if (handleDelete) {
      handleDelete();
    }
  };

  if (!patient) {
    return (
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.addCard}
        onClick={onClick}
      >
        <Typography.Title
          className={styles.cardTitle}
          view="small"
          weight="regular"
          tag="h2"
          color={isHovered ? 'primary' : 'secondary'}
        >
          {config.getAddPatientMessage(ageCategory)}
        </Typography.Title>
      </button>
    );
  }
  const {
    id,
    fullName,
    dateOfBirth,
    ageCategory: ageCategoryPatient,
    active,
  } = patient;

  const handleChangeActive = (id: string) => () => {
    if (active) return;
    if (changeActiveStatus) {
      changeActiveStatus({ id: id });
    }
  };

  return (
    <div className={styles.editCard}>
      <div
        className={
          active ? styles.editCardContentActive : styles.editCardContent
        }
        onClick={handleChangeActive(id)}
      >
        <Typography.Title
          className={styles.editCardTitle}
          view="xsmall"
          weight="bold"
          tag="h3"
          color="primary"
        >
          {fullName}
        </Typography.Title>
        <Typography.Text view="primary-large" tag="p" color="primary">
          {getNameOfAgeCategory[ageCategoryPatient]}
        </Typography.Text>
        <Typography.Text view="primary-medium" tag="p" color="secondary">
          {dateOfBirth}
        </Typography.Text>
      </div>
      <div className={styles.editCardMenu}>
        <div
          className={
            active
              ? styles.editCardMenuPrimaryItemActive
              : styles.editCardMenuPrimaryItem
          }
        >
          <CheckmarkMIcon color={active ? 'white' : 'rgba(4, 4, 19, 0.55)'} />
        </div>
        {buttonsItems.map(({ id, Icon }) => (
          <button
            onClick={id === 'edit' ? handleEditCard : handleDeleteCard}
            key={id}
            className={styles.editCardMenuItem}
          >
            <Icon color="secondary" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const PatientCard = PatientCardInner;
