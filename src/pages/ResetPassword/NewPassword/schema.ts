import * as yup from 'yup';
import { AppErrors, getMinLengthErrorMessage } from '@/constants/errors';
import { Regex } from '@/constants/regex';

const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export const schema = yup.object({
  newPassword: yup
    .string()
    .min(MIN_LENGTH, getMinLengthErrorMessage('Пароль', MIN_LENGTH))
    .max(MAX_LENGTH, getMinLengthErrorMessage('Пароль', MAX_LENGTH))
    .matches(Regex.lowercase, AppErrors.lowercasePassword)
    .matches(Regex.uppercase, AppErrors.uppercasePassword)
    .matches(Regex.specialCharacter, AppErrors.specialCharactersPassword)
    .required(AppErrors.requiredField),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], AppErrors.samePasswords)
    .required(AppErrors.requiredField),
});
