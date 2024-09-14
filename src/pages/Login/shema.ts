import * as yup from 'yup';
import { getMinLengthErrorMessage } from '@/constants/errors';

const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export const schema = yup.object({
  email: yup
    .string()
    .min(MIN_LENGTH, getMinLengthErrorMessage('Логин', MIN_LENGTH))
    .required(),
  password: yup
    .string()
    .min(MIN_LENGTH, getMinLengthErrorMessage('Пароль', MIN_LENGTH))
    .max(MAX_LENGTH, getMinLengthErrorMessage('Пароль', MAX_LENGTH))
    .required(),
});
