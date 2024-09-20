export const config = {
  title: <>Регистрация</>,
  nameField:{
    name: 'name',
    label: 'Имя',
  },
  surnameField:{
    name: 'surname',
    label: 'Фамилия',
  },
  emailField: {
    name: 'email',
    label: 'E-mail',
  },
  passwordField: {
    name: 'password',
    label: 'Пароль',
  },
  confirmPasswordField: {
    name: 'confirmPassword',
    label: 'Повторите пароль',
  },
  button: 'Продолжить',
  link: 'Уже есть аккаунт?',
  modal:{
    title: 'Успешная регистрация!',
    primaryBtn: 'Войти',
    secondaryBtn: 'Отмена'
  }
} as const;
