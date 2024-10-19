import { AgeCategory } from '@/types';

export const patientsSkeletons = [
  {
    id: 1,
    ageCategory: AgeCategory.ADULT,
    patient: null,
  },
  {
    id: 2,
    ageCategory: AgeCategory.ADULT,
    patient: null,
  },
  {
    id: 3,
    ageCategory: AgeCategory.CHILD,
    patient: null,
  },
  {
    id: 4,
    ageCategory: AgeCategory.CHILD,
    patient: null,
  },
  {
    id: 5,
    ageCategory: AgeCategory.CHILD,
    patient: null,
  },
  {
    id: 6,
    ageCategory: AgeCategory.CHILD,
    patient: null,
  },
];


export const config = {
    notificationTitle: 'Успешно!',
    notificationMessage: 'Пациент успешно сохранён.',
    notificationMessageDelete: 'Пациент успешно удален.',
    modal: {
      headerTitle: 'Удаление пациента',
      message: 'Вы уверены, что хотите удалить пациента? Это действие необратимо.',
      primaryBtn: 'Подтавердить',
      secondaryBtn: 'Отменить',
    },
};
  