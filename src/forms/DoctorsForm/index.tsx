import { SubmitHandler, useForm } from 'react-hook-form';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { config } from './constants';
import styles from './index.module.css';

import { schema } from './schema';
import { FormModal } from '@/components/FormModal';
import { ControlledInput } from '@/components/ControledInput';
import { ControlledSelect } from '@/components/ControledSelect';
import { useApiGet } from '@/hooks/useApiGet';
import { getFreeOfficesConfig } from '@/api/offices';
import { shiftsOfWorkOptions } from '@/constants/typeOfShifts';
import { UpdateDoctor, DoctorResponse } from '@/types/doctor';
import { getDoctorConfig } from '@/api/doctors';
import { doctorSpecialtyOptions } from '@/constants/doctorSpecialty';

interface OfficeFormProps {
  handleClose: () => void;
  id: string | undefined;
  isLoading: boolean;
  submit: (data: UpdateDoctor) => void;
}

type Inputs = {
  email: string;
  fullName: string;
  specialty: OptionShape;
  typeOfShifts: OptionShape;
  office?: OptionShape|null;
};

export const DoctorsForm = ({
  id,
  handleClose,
  isLoading,
  submit,
}: OfficeFormProps) => {
  const {data: initialData} = useApiGet<DoctorResponse>({
    ...getDoctorConfig(id,[id]),
    options:{
      enabled: Boolean(id)
    }
  })
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const { specialty, typeOfShifts } = methods.getValues();
  const {
    data,
    isLoading: isLoadingFreeOffices,
    isFetching: isFetchingFreeOffices,
  } = useApiGet<OptionShape[]>({
    ...getFreeOfficesConfig([typeOfShifts?.key, specialty?.key]),
    options: {
      enabled: Boolean(specialty) && Boolean(typeOfShifts),
    },
    params: {
      typeOfShifts: typeOfShifts?.key,
      specialty: specialty?.key,
    },
  });

  useEffect(() => {
    if (initialData) {
      methods.reset({
        email: initialData.email,
        fullName: initialData.fullName,
        specialty: doctorSpecialtyOptions.find(option => option.key === initialData.specialty),
        typeOfShifts: shiftsOfWorkOptions.find((option)=>option.key === initialData.typeOfShifts),
        office: initialData.office
      });
    }
  }, [initialData, methods]);


  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    const [surname, name, patronymic] = data.fullName.split(' ');
    submit({
      id: id,
      name,
      surname,
      patronymic,
      specialty: data.specialty.key,
      typeOfShifts: data.typeOfShifts.key,
      officeId: data.office?data.office.key: undefined,
      email: data.email,
    });
  };

  const disabledOfficeSelect = isLoadingFreeOffices || isFetchingFreeOffices;

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
            {...config.emailField}
            clear
            methods={methods}
            size="m"
            required={true}
          />
          <ControlledInput
            name="fullName"
            label="ФИО"
            clear
            methods={methods}
            size="m"
            required={true}
          />
          <ControlledSelect
            {...config.specialtyField}
            clear
            methods={methods}
            size="m"
            required={true}
            options={doctorSpecialtyOptions}
          />
          <ControlledSelect
            {...config.typeOfShiftsField}
            clear
            methods={methods}
            size="m"
            required={true}
            options={shiftsOfWorkOptions}
          />
          <ControlledSelect
            {...config.office}
            clear
            methods={methods}
            size="m"
            popoverPosition="top"
            required={true}
            options={data || []}
            custom="office"
            disabled={disabledOfficeSelect || !specialty || !typeOfShifts}
          />
        </div>
      </form>
    </FormModal>
  );
};
