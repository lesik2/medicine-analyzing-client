export const config={
    title:'Восстановление пароля',
    text: 'Для получения нового пароля укажите e-mail, который вы использовали при регистрации',
    emailField: {
        name: 'email',
        label: 'E-mail',
    },
    button:'Отправить',
    successSendingTitle: 'E-mail успешно доставлен',
    successSendingMessage: 'Мы отправили письмо для восстановления пароля на вашу почту'
} as const