export const getMinLengthErrorMessage = (name: string, limitValue: number) =>
  `${name} должен содержать от ${limitValue} символов`;

export const getMaxLengthErrorMessage = (name: string, limitValue: number) =>
  `${name} должен содержать до ${limitValue} символов`;

export enum AppErrors {
  wrongSignInTitle = 'Ошибка авторизации',
  wrongSignUpTitle = 'Ошибка регистрации',
  samePasswords = 'Пароли должны совпадать',
  lowercasePassword = 'Пароль должен содержать хотя бы одну строчную букву',
  uppercasePassword = 'Пароль должен содержать хотя бы одну заглавную букву',
  requiredField = 'Заполните это поле',
  specialCharactersPassword = 'Пароль должен содержать хотя бы один специальный символ',
  incorrectEmail = 'Некорректный формат E-mail',
  incorrectNameFormat = 'Имя должно содержать только буквы алфавита',
  incorrectSurnameFormat = 'Фамилия должна содержать только буквы алфавита',
  wrongInput = 'Некорректый ввод',
  generalError = 'Ошибка!',
}
