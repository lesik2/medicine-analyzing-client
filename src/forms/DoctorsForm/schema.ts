import * as yup from 'yup';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { AppErrors, getMinLengthErrorMessage } from '@/constants/errors';

const MIN_LENGTH = 6;

export const schema = yup.object({
  fullName: yup.string().required(AppErrors.requiredField),
  specialty: yup.mixed<OptionShape>().required(AppErrors.requiredField),
  typeOfShifts: yup.mixed<OptionShape>().required(AppErrors.requiredField),
  email: yup
    .string()
    .email(AppErrors.incorrectEmail)
    .min(MIN_LENGTH, getMinLengthErrorMessage('E-mail', MIN_LENGTH))
    .required(AppErrors.requiredField),
  office: yup.mixed<OptionShape>().required(AppErrors.requiredField),
});
