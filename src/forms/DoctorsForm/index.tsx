import { SubmitHandler, useForm } from 'react-hook-form';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { config } from './constants';
import styles from './index.module.css';

import { schema } from './schema';
import { FormModal } from '@/components/FormModal';
import { ControlledInput } from '@/components/ControledInput';
import { ControlledSelect } from '@/components/ControledSelect';
import { officeSpecialtyOptions } from '@/constants/officeSpeciality';
import { useApiGet } from '@/hooks/useApiGet';
import { getFreeOfficesConfig } from '@/api/offices';
import { shiftsOfWorkOptions } from '@/constants/typeOfShifts';
import { CreateDoctor } from '@/types/doctor';

interface OfficeFormProps {
  handleClose: () => void;
  id: string | undefined;
  isLoading: boolean;
  submit: (data: CreateDoctor) => void;
}

type Inputs = { 
  email: string;
  fullName: string;
  specialty: OptionShape;
  typeOfShifts: OptionShape;
  office: OptionShape;
};

export const DoctorsForm = ({
  id,
  handleClose,
  isLoading,
  submit
}: OfficeFormProps) => {
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const { specialty, typeOfShifts } = methods.getValues();
  const { data,isLoading:isLoadingFreeOffices, isFetching:isFetchingFreeOffices } = useApiGet<OptionShape[]>({
    ...getFreeOfficesConfig([
        typeOfShifts?.key,
        specialty?.key
    ]),
    options:{
        enabled: Boolean(specialty) && Boolean(typeOfShifts)
    },
    params: {
        typeOfShifts: typeOfShifts?.key,
        specialty: specialty?.key,
    },
  });

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    const [surname, name, patronymic] = data.fullName.split(' ');
    submit({
        name,
        surname,
        patronymic,
        specialty:data.specialty.key,
        typeOfShifts: data.typeOfShifts.key,
        officeId: data.office.key,
        email: data.email
    })
  };

  const disabledOfficeSelect = isLoadingFreeOffices|| isFetchingFreeOffices

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
              name='fullName'
              label='ФИО'
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
            options={officeSpecialtyOptions}
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
            popoverPosition='top'
            required={true}
            options={data || []}
            custom='office'
            disabled={disabledOfficeSelect || !specialty || !typeOfShifts}
          />
        </div>
      </form>
    </FormModal>
  );
};
