import { PencilMIcon } from '@alfalab/icons-glyph/PencilMIcon';
import { TrashCanLineMIcon } from '@alfalab/icons-glyph/TrashCanLineMIcon';
import { AgeCategory } from '@/types';

export const config = {
  getAddPatientMessage: (ageCategory: AgeCategory) =>
    `Добавить пациента (${ageCategory})`,
};

export const getNameOfAgeCategory = {
  [AgeCategory.ADULT]: 'взрослый',
  [AgeCategory.CHILD]: 'ребёнок',
} as const;

export const buttonsItems = [
  {
    id: 'edit',
    Icon: PencilMIcon,
  },
  {
    id: 'create',
    Icon: TrashCanLineMIcon,
  },
];
