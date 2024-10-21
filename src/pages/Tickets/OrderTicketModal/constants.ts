export enum OrderTicketStep {
  SPECIALTY = 1,
  DOCTOR = 2,
  DATE_AND_TIME = 3,
  PATIENTS = 4,
  ORDER = 5,
}
export const DATA = [
  {
    id: OrderTicketStep.SPECIALTY,
    title: 'Специальность',
    btnText: 'Выйти',
  },
  {
    id: OrderTicketStep.DOCTOR,
    title: 'Врач',
    btnText: 'Назад',
  },
  {
    id: OrderTicketStep.DATE_AND_TIME,
    title: 'Дата и время',
    btnText: 'Назад',
  },
  {
    id: OrderTicketStep.PATIENTS,
    title: 'Пациенты',
    btnText: 'Назад',
  },
  {
    id: OrderTicketStep.ORDER,
    title: 'Запись',
    btnText: 'Назад',
  },
];

export const config = {
  primaryBtnText: 'Готово',
};
