import * as yup from 'yup';
import { AppErrors, getMinLengthErrorMessage } from '@/constants/errors';

const MIN_LENGTH = 6;

export const schema = yup.object({
  email: yup
    .string()
    .email(AppErrors.incorrectEmail)
    .min(MIN_LENGTH, getMinLengthErrorMessage('E-mail', MIN_LENGTH))
    .required(AppErrors.requiredField),
});
