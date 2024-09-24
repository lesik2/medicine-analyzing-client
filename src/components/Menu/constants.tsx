import { NavigationProfileMIcon } from '@alfalab/icons-glyph/NavigationProfileMIcon';
import { ReceiptLineMIcon } from '@alfalab/icons-glyph/ReceiptLineMIcon';
import { DoorArrowRightBoldMIcon } from '@alfalab/icons-glyph/DoorArrowRightBoldMIcon';
import { ReactNode } from 'react';
import { Routes } from '@/constants/routes';

export const logoutItemName = 'Выход';

interface MenuItem {
  iconElement: ReactNode;
  name: string;
  routePath: string;
  id: number;
}

export const menuItemsConfig: MenuItem[] = [
  {
    id: 0,
    name: 'Профиль',
    iconElement: <NavigationProfileMIcon />,
    routePath: Routes.PROFILE,
  },
  {
    id: 1,
    name: 'Талоны',
    iconElement: <ReceiptLineMIcon />,
    routePath: Routes.TICKETS,
  },
  {
    id: 2,
    name: logoutItemName,
    iconElement: <DoorArrowRightBoldMIcon />,
    routePath: Routes.LOGIN,
  },
];
