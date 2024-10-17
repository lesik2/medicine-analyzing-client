import { SubmitHandler, useForm } from 'react-hook-form';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { config } from './constants';
import styles from './index.module.css';
import { schema } from './sсhema';
import { FormModal } from '@/components/FormModal';
import { ControlledInput } from '@/components/ControledInput';
import { ControlledSelect } from '@/components/ControledSelect';
import { officeSpecialtyOptions } from '@/constants/officeSpeciality';
import { UpdateOffice, OfficeResponse } from '@/types/office';
import { useApiGet } from '@/hooks/useApiGet';
import { getOfficeConfig } from '@/api/offices';

interface OfficeFormProps {
  handleClose: () => void;
  id: string | undefined;
  submit: (data: UpdateOffice) => void;
  isLoading: boolean;
}

type Inputs = {
  number: string;
  specialty: OptionShape;
};

export const OfficesForm = ({
  id,
  handleClose,
  submit,
  isLoading,
}: OfficeFormProps) => {
  const { data } = useApiGet<OfficeResponse>({
    ...getOfficeConfig(id, [id]),
    options: {
      enabled: Boolean(id),
    },
  });

  const methods = useForm<Inputs>({ resolver: yupResolver(schema)});

  useEffect(() => {
    if (data) {
      methods.reset({
        specialty: officeSpecialtyOptions.find(
          (option) => option.key === data.specialty,
        ),
        number: data.number.toString(),
      });
    }
  }, [data, methods]);

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    submit({
      id: id,
      number: Number.parseInt(data.number),
      specialty: data.specialty? data.specialty.key: '',
    });
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
            {...config.numberField}
            type="number"
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
        </div>
      </form>
    </FormModal>
  );
};
