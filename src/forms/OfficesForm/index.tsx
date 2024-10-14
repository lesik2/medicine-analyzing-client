import { SubmitHandler, useForm } from 'react-hook-form';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { config } from './constants';
import styles from './index.module.css';
import { schema } from './sсhema';
import { FormModal } from '@/components/FormModal';
import { ControlledInput } from '@/components/ControledInput';
import { ControlledSelect } from '@/components/ControledSelect';
import { officeSpecialtyOptions } from '@/constants/officeSpeciality';
import { CreateOffice } from '@/types/office';

interface OfficeFormProps {
  handleClose: () => void;
  id: string | undefined;
  submit: (data: CreateOffice) => void;
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
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    submit({
      number: Number.parseInt(data.number),
      specialty: data.specialty.key,
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
