import { Outlet } from 'react-router-dom';
import styles from './index.module.css';
import { Menu } from '@/components/Menu';

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.wrapperContent}>
        <Outlet />
      </div>
    </div>
  );
};
