import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useEffect } from 'react';
import { config, radioGroups } from './constants';
import styles from './index.module.css';
import { schema } from './sсhema';
import { FormModal } from '@/components/FormModal';
import { ControlledInput } from '@/components/ControledInput';
import { PatientResponse, UpdatePatient } from '@/types/patient';
import { ControlledRadioGroup } from '@/components/ControlledRadioGroup';
import { ControlledDateInput } from '@/components/ControlledDateInput';
import { YYYY_MM_DD_MOMENT_DATE_FORMAT } from '@/constants/date';
import { useApiGet } from '@/hooks/useApiGet';
import { getPatientConfig } from '@/api/patients';

interface OfficeFormProps {
  handleClose: () => void;
  id: string | undefined;
  submit: (data: UpdatePatient) => void;
  isLoading: boolean;
  ageCategory: string;
}

type Inputs = {
  name: string;
  surname: string;
  patronymic?: string;
  gender: string;
  dateOfBirth: Date;
};

export const PatientsForm = ({
  id,
  handleClose,
  submit,
  isLoading,
  ageCategory
}: OfficeFormProps) => {
  const { data,
    isFetching,
    isLoading: isLoadingInitialData,
  } = useApiGet<PatientResponse>({
    ...getPatientConfig(id, [id]),
    options: {
      enabled: Boolean(id),
    },
  });


  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  useEffect(() => {
    const loading = isFetching || isLoadingInitialData;
    if (data && !loading) {
      methods.reset({
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
      });
    }
  }, [data, methods,isFetching,isLoadingInitialData]);

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    submit({
      id:id,
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      gender: data.gender,
      ageCategory: ageCategory,
      dateOfBirth: moment(data.dateOfBirth).format(YYYY_MM_DD_MOMENT_DATE_FORMAT)
    })
  };

  return (
    <FormModal
      title={config.title}
      id={id}
      handleClose={handleClose}
      handleSubmit={methods.handleSubmit(handleSubmit)}
      primaryLoading={isLoading}
    >
      <form>
        <div className={styles.contentWrapperFields}>
          <ControlledInput
            {...config.nameField}
            clear
            methods={methods}
            size="m"
            required={true}
          />
          <ControlledInput
            {...config.surnameField}
            clear
            methods={methods}
            size="m"
            required={true}
          />
          <ControlledInput
            {...config.patronymicField}
            clear
            methods={methods}
            size="m"
            required={true}
          />
          <ControlledRadioGroup
            methods={methods}
            required
            {...config.genderField}
            radioGroups={radioGroups}
          />
          <ControlledDateInput size='m' methods={methods} {...config.dateField} required clear />
        </div>
      </form>
    </FormModal>
  );
};
