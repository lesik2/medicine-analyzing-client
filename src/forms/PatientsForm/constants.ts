import { Gender } from '@/types';

export const config = {
  title: 'пациента',
  nameField: {
    name: 'name',
    label: 'Имя',
  },
  surnameField: {
    name: 'surname',
    label: 'Фамилия',
  },
  patronymicField: {
    name: 'patronymic',
    label: 'Отчество',
  },
  genderField: {
    name: 'gender',
    label: 'Пол'
  },
  dateField: {
    name:'dateOfBirth',
    label: 'Дата рождения'
  }
} as const;

export const radioGroups = [
  {
    label: Gender.MALE,
    value: Gender.MALE,
  },
  {
    label: Gender.FEMALE,
    value: Gender.FEMALE,
  },
];
