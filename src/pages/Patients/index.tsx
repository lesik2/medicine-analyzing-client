import styles from './index.module.css';
import { useApiGet } from '@/hooks/useApiGet';
import { Heading } from '@/components/Heading';
import { getAllPatientsConfig } from '@/api/patients';
import { getAllPatientResponse } from '@/types/patient';
import { PatientCard } from '@/components/PatientCard';
import { AppSpinner } from '@/components/AppSpinner';

export const PatientsPage = () => {

    const {data} = useApiGet<getAllPatientResponse[]>({
        ...getAllPatientsConfig
    })
  return (
    <div className={styles.pageWrapper}>
      <Heading title="Пациенты" />
      <div className={styles.contentWrapper}>
      <div className={styles.patientCardsWrapper}>
        {data? data.map(({patient,id,ageCategory})=>(
            <PatientCard key={id} patient={patient} ageCategory={ageCategory}/>
        )):
         <div className={styles.loaderWrapper}>
            <AppSpinner />
         </div>
         }
      </div>
      </div>
    </div>
  );
};
