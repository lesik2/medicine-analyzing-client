export const getMinLengthErrorMessage = (name: string, limitValue: number) =>
  `${name} должен содержать от ${limitValue} символов`;

export const getMaxLengthErrorMessage = (name: string, limitValue: number) =>
  `${name} должен содержать до ${limitValue} символов`;

export enum AppErrors {
  wrongSignInTitle = 'Ошибка авторизации.',
  wrongSignInMessage = 'Не удалось войти. Проверьте, правильно ли вы ввели свои данные.',
}
