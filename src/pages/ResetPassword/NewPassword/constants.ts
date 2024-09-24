export const config = {
  title: 'Восстановление пароля',
  newPasswordField: {
    name: 'newPassword',
    label: 'Новый пароль',
  },
  confirmPasswordField: {
    name: 'confirmPassword',
    label: 'Повторите пароль',
  },
  button: 'Сохранить',
  modal: {
    title: 'Успешная смена пароля!',
    message: 'Ваш пароль был успешно изменен. Вы можете войти с новым паролем.',
    primaryBtn: 'Войти',
    secondaryBtn: 'Отмена',
  },
} as const;
