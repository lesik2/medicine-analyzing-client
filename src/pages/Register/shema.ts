import * as yup from 'yup';
import { AppErrors, getMinLengthErrorMessage } from '@/constants/errors';
import { Regex } from '@/constants/regex';

const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export const schema = yup.object({
  name: yup
    .string()
    .required(AppErrors.requiredField)
    .matches(Regex.lettersEnglishAndCyrillic, AppErrors.incorrectNameFormat),
  surname: yup
    .string()
    .required(AppErrors.requiredField)
    .matches(Regex.lettersEnglishAndCyrillic, AppErrors.incorrectSurnameFormat),
  email: yup
    .string()
    .email(AppErrors.incorrectEmail)
    .min(MIN_LENGTH, getMinLengthErrorMessage('E-mail', MIN_LENGTH))
    .required(AppErrors.requiredField),
  password: yup
    .string()
    .min(MIN_LENGTH, getMinLengthErrorMessage('Пароль', MIN_LENGTH))
    .max(MAX_LENGTH, getMinLengthErrorMessage('Пароль', MAX_LENGTH))
    .matches(Regex.lowercase, AppErrors.lowercasePassword)
    .matches(Regex.uppercase, AppErrors.uppercasePassword)
    .matches(Regex.specialCharacter, AppErrors.specialCharactersPassword)
    .required(AppErrors.requiredField),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], AppErrors.samePasswords)
    .required(AppErrors.requiredField),
});
