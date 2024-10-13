import { NavigationProfileMIcon } from '@alfalab/icons-glyph/NavigationProfileMIcon';
import { ReceiptLineMIcon } from '@alfalab/icons-glyph/ReceiptLineMIcon';
import { DoorArrowRightBoldMIcon } from '@alfalab/icons-glyph/DoorArrowRightBoldMIcon';
import { ArmchairMIcon } from '@alfalab/icons-glyph/ArmchairMIcon';
import { UsersGroupMIcon } from '@alfalab/icons-glyph/UsersGroupMIcon';
import { ReactNode } from 'react';
import { Routes } from '@/constants/routes';
import { Roles } from '@/types/roles';

export const logoutItemName = 'Выход';

interface MenuItem {
  iconElement: ReactNode;
  name: string;
  routePath: string;
  id: number;
  roles: Roles[];
}

export const menuItemsConfig: MenuItem[] = [
  {
    id: 0,
    name: 'Профиль',
    iconElement: <NavigationProfileMIcon />,
    routePath: Routes.PROFILE,
    roles: [Roles.USER],
  },
  {
    id: 1,
    name: 'Талоны',
    iconElement: <ReceiptLineMIcon />,
    routePath: Routes.TICKETS,
    roles: [Roles.USER],
  },
  {
    id: 2,
    name: 'Персонал',
    iconElement: <UsersGroupMIcon />,
    routePath: Routes.DOCTORS,
    roles: [Roles.MANAGER],
  },
  {
    id: 3,
    name: 'Кабинеты',
    iconElement: <ArmchairMIcon />,
    routePath: Routes.OFFICES,
    roles: [Roles.MANAGER],
  },
  {
    id: 4,
    name: logoutItemName,
    iconElement: <DoorArrowRightBoldMIcon />,
    routePath: Routes.LOGIN,
    roles: [Roles.MANAGER, Roles.DOCTOR, Roles.USER],
  },
];
