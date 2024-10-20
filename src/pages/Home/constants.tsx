import { AffordabilityIcon } from '@/assets/icons/AffordabilityIcon';
import { ConvenientIcon } from '@/assets/icons/ConvenientIcon';
import { PhysicianIcon } from '@/assets/icons/PhysicianIcon';
import { WaitTimesIcon } from '@/assets/icons/WaitTimesIcon';

export const config = {
  firstSection: {
    title: 'Скореe выздоравливай',
    link: 'Забронируйте талон',
  },
  secondSection: {
    title: 'Качественная помощь в нужный момент',
    message:
      'Запишитесь на прием и получите качественную медицинскую помощь без ожидания. Мы стремимся сделать ваше лечение максимально комфортным и эффективным.',
    items: [
      {
        id: 1,
        title: 'Доступность',
        iconElement: <AffordabilityIcon />,
      },
      {
        id: 2,
        title: 'Удобство',
        iconElement: <ConvenientIcon />,
      },
      {
        id: 3,
        title: 'Врачи высшего качества',
        iconElement: <PhysicianIcon />,
      },
      {
        id: 4,
        title: 'Короткое время ожидания',
        iconElement: <WaitTimesIcon />,
      },
    ],
  },
} as const;
