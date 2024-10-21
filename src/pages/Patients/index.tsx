import { Skeleton } from '@alfalab/core-components/skeleton';
import { useCallback, useState } from 'react';
import styles from './index.module.css';
import { config, patientsSkeletons } from './constants';
import { useMutatePatients } from './useMutatePatients';
import { useApiGet } from '@/hooks/useApiGet';
import { Heading } from '@/components/Heading';
import { getAllPatientsPatternConfig } from '@/api/patients';
import { getAllPatientResponse } from '@/types/patient';
import { PatientCard } from '@/components/PatientCard';
import { PatientsForm } from '@/forms/PatientsForm';
import { useModal } from '@/hooks/useModal';
import { AgeCategory } from '@/types';
import { AppModal } from '@/components/AppModal';

export const PatientsPage = () => {
  const [idOfDeletedPatient, setIdOfDeletedPatient] = useState<
    string | undefined
  >(undefined);
  const [patientAgeCategory, setPatientAgeCategory] = useState('');
  const { handleClose, handleOpen, isOpen, id } = useModal();
  const { data, refetch } = useApiGet<getAllPatientResponse[]>({
    ...getAllPatientsPatternConfig,
  });

  const handleCloseDeleteModal = useCallback(() => {
    setIdOfDeletedPatient(undefined);
  }, []);

  const {
    mutate,
    isPending,
    changeActiveStatus,
    isPendingDelete,
    deletePatient,
  } = useMutatePatients({
    id: id,
    refetch: refetch,
    handleClose: handleClose,
    handleCloseDelete: handleCloseDeleteModal,
  });

  const handleOpenModal = (ageCategory: AgeCategory) => () => {
    handleOpen();
    setPatientAgeCategory(ageCategory);
  };

  const handleCloseModal = useCallback(() => {
    handleClose();
    setPatientAgeCategory('');
  }, [handleClose]);

  const handleEdit = (id: string | undefined, ageCategory: string) => () => {
    handleOpen(id);
    setPatientAgeCategory(ageCategory);
  };

  const handleOpenDeleteModal = (id: string | undefined) => () => {
    setIdOfDeletedPatient(id);
  };

  const handleDelete = useCallback(() => {
    deletePatient(idOfDeletedPatient);
  }, [idOfDeletedPatient, deletePatient]);

  return (
    <div className={styles.pageWrapper}>
      <Heading title="Пациенты" />
      <div className={styles.contentWrapper}>
        <div className={styles.patientCardsWrapper}>
          {data
            ? data.map(({ patient, id, ageCategory }) => (
                <PatientCard
                  key={id}
                  patient={patient}
                  ageCategory={ageCategory}
                  onClick={handleOpenModal(ageCategory)}
                  changeActiveStatus={changeActiveStatus}
                  handleEdit={handleEdit(patient?.id, ageCategory)}
                  handleDelete={handleOpenDeleteModal(patient?.id)}
                />
              ))
            : patientsSkeletons.map(({ patient, id, ageCategory }) => (
                <Skeleton key={id} visible={true} animate={true}>
                  <PatientCard patient={patient} ageCategory={ageCategory} />
                </Skeleton>
              ))}
        </div>
      </div>
      {isOpen && (
        <PatientsForm
          submit={mutate}
          id={id}
          handleClose={handleCloseModal}
          isLoading={isPending}
          ageCategory={patientAgeCategory}
        />
      )}
      {idOfDeletedPatient && (
        <AppModal
          isOpen={Boolean(idOfDeletedPatient)}
          handleClose={handleCloseDeleteModal}
          handlePrimaryClick={handleDelete}
          {...config.modal}
          showIcon={false}
          isPending={isPendingDelete}
        />
      )}
    </div>
  );
};
