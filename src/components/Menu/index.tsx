import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import styles from './index.module.css';
import { MenuItem } from './MenuItem';
import { logoutItemName, menuItemsConfig } from './constants';
import { StorageKeys } from '@/constants/localStorage';
import { authUserAtom } from '@/atoms/auth';
import { useApiGet } from '@/hooks/useApiGet';
import { logoutConfig } from '@/api/auth';

export const Menu = () => {
  const location = useLocation();
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const { refetch } = useApiGet({
    ...logoutConfig,
    options: {
      enabled: false,
    },
  });

  const handleLogout = async () => {
    await refetch();
    setAuthUser(null);
    localStorage.removeItem(StorageKeys.accessToken);
    localStorage.removeItem(StorageKeys.refreshToken);
    localStorage.removeItem(StorageKeys.authUser);
  };

  const menuItems = useMemo(() => {
    if (authUser) {
      return menuItemsConfig.filter((item) =>
        item.roles.includes(authUser?.role),
      );
    }
    return [];
  }, [authUser]);

  return (
    <div className={styles.menuWrapper}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          isActive={location.pathname.includes(item.routePath)}
          {...item}
          onClick={logoutItemName === item.name ? handleLogout : undefined}
        />
      ))}
    </div>
  );
};
