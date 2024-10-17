import * as yup from 'yup';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { AppErrors } from '@/constants/errors';

export const schema = yup.object({
  number: yup.string().required(AppErrors.requiredField),
  specialty: yup.mixed<OptionShape>().required(AppErrors.requiredField),
});
