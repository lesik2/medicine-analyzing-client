import { OptionShape } from '@alfalab/core-components/select/shared';

export const shiftsOfWork = {
  'Первая смена': 'Первая смена (08.00 - 13.00)',
  'Вторая смена': 'Вторая смена (14.00 - 18.50)',
  'Полная смена': 'Полная смена (08.00 - 18.50)',
} as const;

export const shiftsOfWorkOptions: OptionShape[] = Object.entries(
  shiftsOfWork,
).map(([key, value]) => ({
  key,
  content: value,
}));
