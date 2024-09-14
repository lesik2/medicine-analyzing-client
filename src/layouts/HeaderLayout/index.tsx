import { Outlet } from 'react-router-dom';
import styles from './index.module.css';
import { Header } from '@/components/Header';

export const HeaderLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </>
  );
};
