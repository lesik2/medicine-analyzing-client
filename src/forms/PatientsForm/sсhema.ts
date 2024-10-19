import * as yup from 'yup';
import { AppErrors } from '@/constants/errors';
import { Regex } from '@/constants/regex';
export const schema = yup.object({
  name: yup
    .string()
    .required(AppErrors.requiredField)
    .matches(Regex.lettersEnglishAndCyrillic, AppErrors.incorrectNameFormat),
  surname: yup
    .string()
    .required(AppErrors.requiredField)
    .matches(Regex.lettersEnglishAndCyrillic, AppErrors.incorrectSurnameFormat),
  patronymic: yup
    .string()
    .optional()
    .test(
      'is-valid-patronymic',
      AppErrors.incorrectPatronymicFormat,
      (value) => {
        if (!value) return true;
        return Regex.lettersEnglishAndCyrillic.test(value);
      }
    ),
  gender: yup.string().required(AppErrors.requiredField),
  dateOfBirth: yup.date().required(AppErrors.requiredField)
});
